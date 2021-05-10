const ws = require('ws')
const fs = require('fs')
const https = require('https')
const querystring = require('querystring')
const Meeting = require('../meeting').Meeting

// const privateKey = fs.readFileSync('/Users/alexkuksenko/Documents/tls-self-signed-cert/localhost.key', 'utf8')
// const certificate = fs.readFileSync('/Users/alexkuksenko/Documents/tls-self-signed-cert/localhost.crt', 'utf8')

// const httpsServer = https.createServer({ key: privateKey, cert: certificate })
const httpsServer = https.createServer()

httpsServer.on('error', (error) => console.log(error))

const server = new ws.Server({
  server: httpsServer
})

const meetingsMap = new Map()

server.on('connection', function (socket, req) {
  const queryParams = querystring.parse(req.url.replace(/(^\/)|(\?)/g, ''))
  const meetingId = queryParams.meetingId
  const isInstructorRole = queryParams.isInstructorRole === 'true'
  if (!meetingId) {
    return
  }

  if (!meetingsMap.has(meetingId)) {
    meetingsMap.set(meetingId, new Meeting())
  }

  const meeting = meetingsMap
    .get(meetingId)
    .addConnection(isInstructorRole, socket)

  console.log('new connection', isInstructorRole ? 'instructor' : 'customer', meetingId)

  socket.on('message', onMessage)
  socket.on('close', function () {
    meeting.addConnection(isInstructorRole, undefined)
  })

  function onMessage (message) {
    console.log('on message from', isInstructorRole ? 'instructor' : 'customer')
    meeting.sendMessageToPartner(isInstructorRole, message)
  }

  if (meeting.bothInMeeting()) {
    console.log('both partners connected')
    meeting.sendAll('ready')
  }
})

module.exports.httpsServer = httpsServer
