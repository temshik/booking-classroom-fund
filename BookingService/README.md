# Booking Service

## General
The service provides logic for booking a classroom fund for top-level users in the application. This service will be used by dispatcher, who has the highest priority for booking classrooms for (1-2 courses), responsible for the educational process (3-4 courses). And there are also teachers who can leave a request to the dispatcher to change the time of the lesson.
The service also interacts with other services: Catalog service and Identity service.

#### BookingsController methods
| Method                | Description                                         					     |
| --------------------- | ------------------------------------------------------------------------------------------ |
| CreateBooking         | Creates a new booking                               					     |
| UpdateBooking         | Updates booking info                                			 		     |
| DeleteBooking         | Delete the booking                                  			  		     |
| GetBookings		| Get the information about booking a classroom fund by WorkspaceNumbers at the CampusNumber |
| GetBookingsPaged	| Get the information about booking a classroom fund by UserName 			     |


## Cases

**Feature**: Add booking
**As a** top-level role user
**I want to** add booking by The theory ot timetable

**Scenario 1**: User was successfully authenticated
**Given** userId, workspaceId, day of week, time, group number
**Then** we will show that booking has been successfully added

**Scenario 2**: User-entered data dosn't exist
**Given** userId, workspaceId, date, time, group number
**Then** we will show error that such workspace dosn't exist

---

**Feature**: Create a new booking
**As a** top-level role user
**I want to** register a new booking
**The same as Add booking feature**

---

**Feature**: Delete booking
**As a** top-level role user
**I want to** delete an existing booking
**The same as Add booking feature**

---

**Feature**: Update booking
**As a** top-level role user
**I want to** update a booking

**Scenario 1**: Booking with entered data already exists
**Given** userId, workspaceId, day of week, time, group number
**Then** we will show that booking with such data is already exists

**Scenario 2**: Data entered incorrectly
**Given** userId, workspaceId, day of week, time, group number
**Then** we will show error that data is incorrect

**Scenario 3**: Data has been enterd successfully
**Given** userId, workspaceId, day of week, time, group number
**Then** we will show that booking has been successfully updated 

---

**Feature**: Get bookings by workspace numbers at the campus number
**As a** teacher or or top-level role user
**I want to** get bookings

**Scenario 1**: Workspace numbers at the campus number entered incorrectly
**Given** workspace numbers and campus number
**Then** we will show an error due to which the enterd data doesn't pass validation

**Scenario 2**: Bookings with entered data dosn't exist
**Given** workspace numbers and campus number
**Then** we will show error that such bookings dosn't exist

**Scenario 3**: Data has been enterd successfully
**Given** workspace numbers and campus number
**Then** we will show bookings 

---

**Feature**: Get bookings by user name 
**As a** teacher or or top-level role user
**I want to** get bookings

**Scenario 1**: User name entered incorrectly
**Given** user name 
**Then** we will show an error due to which the user name doesn't pass validation

**Scenario 2**: User with entered name dosn't exist
**Given** user name
**Then** we will show error that such user dosn't exist

**Scenario 3**: Data has been enterd successfully
**Given** user name
**Then** we will show bookings 
