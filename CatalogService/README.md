# Catalog Service

## General
The service provides logic for getting data from Categories & Workspaces. Service, also provides base operation with workspaces. This service will be used by both authenticated users and non-authenticated users who want to know which workspaces are occupied or free, as well as users with a high level of access will be able to update, delete and add new workspaces. The service also interacts with other services: Identity service and Booking service.

#### CatalogController methods
| Method                | Description                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------- |
| GetCategories         | Information about the entire categories                                                       |
| Get		            | Specific workspace data             	                                                        |
| GetWorkspaces		    | Gets all workspaces by by The theory ot timetable (Category -> CourseNumber -> NumberOfSeats) |
| CreateWorkspace       | Creates a new workspace             	                                                        |
| UpdateWorkspace       | Updates a workspace                	                                                        |
| DeleteWorkspace       | Deletes a specific workspace       	                                                        |

## Cases

**Feature**: Catalog data
**As a** user
**I want to** get all information about the entire catalog

**Scenario 1**: Data was received successfully
**Then** we will show catalog data

---

**Feature**: Specific workspace
**As a** user
**I want to** get specific workspace data 

**Scenario 1**: Data was received successfully
**Given** specific workspace to find
**Then** we will show specific workspace data 

**Scenario 2**: Workspace with entered id dosn't exist
**Given** specific workspace to find
**Then**  we will show error that such workspace dosn't exist

---

**Feature**: Create
**As a** top-level user
**I want to** register a new workspace

**Scenario 1**: Data was received successfully
**Given** category, housing number, workspace number, description
**Then** we will show that workspace has been successfully registered

**Scenario 2**: Workspace with entered data exists
**Given** category, housing number, workspace number, description
**Then** we will show error that workspace is busy

---

**Feature**: Delete 
**As a** top-level user
**I want to** delete an existing workspace

**Scenario 1**: Workspace was find successfully
**Given** workspace to delete
**Then** we will show that workspace has been successfully deleted

**Scenario 2**: Workspace with entered id dosn't exist
**Given** workspace to delete
**Then** we will show error that such workspace dosn't exist

---

**Feature**: Edit
**As a** user or top-level role user
**I want to** edit a workspace

**Scenario 1**: Workspace with entered data already exists
**Given** category, housing number, workspace number, description
**Then** we will show that workspace with such data is busy

**Scenario 2**: Data entered incorrectly
**Given** category, housing number, workspace number, description
**Then** we will show error that data is incorrect

**Scenario 3**: Data has been enterd successfully
**Given** category, housing number, workspace number, description
**Then** we will show that workspace has been successfully edited

## Technologies 

MS Sql.
The Ms sql server contains excellent compression and encrytion capabilities that result in improved data storage and 
retrievial funtions. The Ms sql server is one of the most secure database servers with encryption algorithms making it virtually impossible to crack the security layers enforced by the user. MS SQL server is not an open-source database server which reduces the risk of attacks on the database server. MS SQL server is fully aware of the importance of your data. Hence MS SQL Server contains many sophisticated features that allow you to recover and restore the data which has been lost or damaged. The structure of this service does not need to be changed that's why we will use a sql database. We will not be using complex type of data that is why we will use Ms sql.

### O.R.M(Object relational mapping)
We will be using EntityFramework as an orm for this application because it provides a way to generate the database form the model.


##### Database Structure

|   Workspace      |
| ---------------- |
| Id               |
|                  |
| CampusNumber     |
|                  |
| WorkspaceNumber  |
|                  |
| CategoryId       |
|                  |
| Category         |
|                  |
| Description      |
|                  |
| NumberOfSeats    |
|                  |
| CourseNumber     |
|                  |

|   Category       |
| ---------------- |
| Id               |
|                  |
| Name             |
|                  |
|SpecialEquipment  |
|                  |
