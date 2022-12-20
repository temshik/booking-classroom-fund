# Identity Service

## General
The service provides logic for registtration, authorization, authentication and setting the rights to use other services for all users in the application. This service will be used by all users who want to register or are already registered. The service also interacts with other services: Catalog service and Booking service.

#### AccountController methods
| Method                | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| Authorize             | Take the credentials as parameters and generate a token to authenticate the user|
| RefreshToken          | To refresh the token if the time of authentication is passed                    |
| GetUserClaims         | Get all list of user claims                                                     |

#### UsersController methods
| Method                | Description                                         |
| --------------------- | --------------------------------------------------- |
| CreateUser            | Creates a new user                                  |
| UpdateUser            | Updates user info                                   |
| DeleteUser            | Delete the user                                     |
| ResetPassword         | Change password if user has forgotten the password  |
| UpdatePassword        | Changes the account's password                      |
| Login                 | Authentification                                    |
| Logout                | Exiting the user from the app                       |
| UpdateUserClaims      | Update user clame                                   |


## Cases

**Feature**: Sign up
**As a** user
**I want to** register

**Scenario 1**: User with entered data exists
**Given** email, year, name, password, passwordConfirm
**Then** we will show error that account is busy

**Scenario 2**: Data entered incorrectly
**Given** email, year, name, password or no data entered
**Then** we will show error that data is incorrect

**Scenario 3**: Password and passwordConfirm dont match
**Given** email, year, name, password, passwordConfirm
**Then** we will show error that password and passwordConfirm dont match

**Scenario 4**: Data has been enterd successfully
**Given** email, year, name, password, passwordConfirm
**Then** we will show that account has been successfully registered and the application will generate a jwt-token for us, which we need to send in order to access the application's resources with secure access.

---

**Feature**: Sign in 
**As a** user
**I want to** authorize

**Scenario 1**: User with entered data dosn't exist
**Given** email and password, (optional check box) Remember Me
**Then** we will show error that such user dosn't exist

**Scenario 2**: Mail or password entered incorrectly
**Given** email and password, (optional check box) Remember Me
**Then** we will show error that email or password is incorrect

**Scenario 3**: Data has been enterd successfully
**Given** email, password
**Then** the application will generate a jwt-token for us, which we need to send in order to access the application's resources with secure access.

---

**Feature**: Create a new user
**As a** top-level role user
**I want to** register a new user
**The same as Sign up feature**

---

**Feature**: Delete user
**As a** top-level role user
**I want to** delete an existing user

**Scenario 1**: User was find successfully
**Given** email or user to delete
**Then** we will show that account has been successfully deleted

**Scenario 2**: User with entered data dosn't exist
**Given** email or user to delete
**Then** we will show error that such user dosn't exist

---

**Feature**: Update user
**As a** user or top-level role user
**I want to** update a user

**Scenario 1**: User with entered email already exists
**Given** year, name, email or user to update
**And** list of roles and claims
**Then** we will show that account with such email is busy

**Scenario 2**: Data entered incorrectly
**Given** year, name, email or user to update
**And** list of roles and claims
**Then** we will show error that data is incorrect

**Scenario 3**: Data has been enterd successfully
**Given** year, name, email or user to update
**And** list of roles and claims
**Then** we will show that account has been successfully updated and the application will generate a jwt-token for us, which we need to send in order to access the application's resources with secure access.

---

**Feature**: Update password
**As a** user or top-level role user
**I want to** change a password

**Scenario 1**: Password entered incorrectly
**Given** email, password or no password entered
**Then** we will show an error due to which the password doesn't pass validation

**Scenario 2**: Password are the same as previously
**Given** email, password
**Then** we will show a message. Change or stay the same

**Scenario 3**: User with entered data dosn't exist
**Given** email and password
**Then** we will show error that such user dosn't exist

---

**Feature**: Reset password
**As a** user
**I want to** reset a password

**Scenario 1**: Password entered incorrectly
**Given** email, password or no password entered
**Then** we will show an error due to which the password doesn't pass validation

**Scenario 2**: User with entered email dosn't exist
**Given** email, password or no password entered
**Then** we will show error that such user dosn't exist

---

**Feature**:  RefreshToken
**As a** user
**I want to** stay logged in

**Scenario 1**: The expired access token and existing token are confirmed correctly
**Then** new access token and refresh token generat

**Scenario 2**: The expired access token and existing token aren't confirmed correctly
**Then** the user logout

## Technologies 

MS Sql.
The Ms sql server contains excellent compression and encrytion capabilities that result in improved data storage and 
retrievial funtions. The Ms sql server is one of the most secure database servers with encryption algorithms making it virtually impossible to crack the security layers enforced by the user. MS SQL server is not an open-source database server which reduces the risk of attacks on the database server. MS SQL server is fully aware of the importance of your data. Hence MS SQL Server contains many sophisticated features that allow you to recover and restore the data which has been lost or damaged. The structure of this service does not need to be changed that's why we will use a sql database. We will not be using complex type of data that is why we will use Ms sql.

### O.R.M(Object relational mapping)
We will be using EntityFramework as an orm for this application because it provides a way to generate the database form the model.


##### Database Structure

| Users               | 
| ------------------- |
| Id                  |
|                     |
| FirstName           |
|                     |                                                        
| LastName            |  
|                     |                                                                              
| Email               | 
|                     |
| Password            |
|                     |
| RegistrationDate    |
|                     |
| UserName            |
|                     |
| NormalizedUserName  |
|                     |
| NormalizedEmail     |
|                     |
| EmailConfirmed      |
|                     |  
| PasswordHash        |
|                     |
| SecurityStamp       |
|                     |
| ConcurrencyStamp    |
|                     |
| PhoneNumber         |
|                     |
| PhoneNumberConfirmed|
|                     |
| TwoFactorEnabled    |
|                     |
| LockoutEnd          |
|                     |
| LockoutEnabled      |
|                     |
| AccessFailedCount   |
|                     |


| Claims              | 
| ------------------- |
| Id                  |
|                     |
| UserId              |
|                     |
| ClaimType           |
|                     |
| ClaimValue          |
|                     |
| Discriminator       |
|                     |


| Tokens              |
| ------------------- |
| UserId              |
|                     |
| LoginProvider       |
|                     |
| Name                |
|                     |
| Value               |
|                     |
| Discriminator       |
|                     |


| AspNetUserLogins    |
| ------------------- |
| LoginProvider       |
|                     |
| ProviderKey         |
|                     |
| ProviderDisplayName |
|                     |
| UserId              |
|                     |


| AspNetUserRoles     |
| ------------------- |
| UserId              |
|                     |
| RoleId              |
|                     |


| Roles               |
| ------------------- |
| Id                  |
|                     |
| Name                |
|                     |
| Description         |
|                     |
| NormalizedName      |
|                     |
| ConcurrencyStamp    |
|                     |


| AspNetRoleClaims    |
| ------------------- |
| Id                  |
|                     |
| RoleId              |
|                     |
| ClaimType           |
|                     |
| ClaimValue          |
|                     |
