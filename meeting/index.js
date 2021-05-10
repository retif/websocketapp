class Meeting {
  constructor () {
    this.instructor = undefined
    this.customer = undefined
  }

  sendAll (message) {
    if (this.customer) {
      this.customer.send(message)
    }
    if (this.instructor) {
      this.instructor.send(message)
    }
  }

  sendMessageToPartner (isInstructorRole, message) {
    if (isInstructorRole) {
      if (this.customer) {
        this.customer.send(message)
      }
    } else {
      if (this.instructor) {
        this.instructor.send(message)
      }
    }
  }

  addConnection (isInstructorRole, socket) {
    if (isInstructorRole) {
      if (this.instructor) {
        this.instructor.close()
      }
      this.instructor = socket
    } else {
      if (this.customer) {
        this.customer.close()
      }
      this.customer = socket
    }
    return this
  }

  bothInMeeting () {
    return !!(this.instructor && this.customer)
  }
}

module.exports = Meeting
