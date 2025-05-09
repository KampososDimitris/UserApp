# User Management Web Application

This is a full-stack web application that allows users to register, view, update, and delete user profiles. It includes features like form validation, modal dialogs, and integration with a backend powered by Spring Boot and a MySQL database.

##  Features

- User registration with form validation
- View detailed user information in modals
- Edit user details and addresses
- Delete users with confirmation
- AJAX-powered interactions using jQuery
- Data persisted using MySQL with JPA/Hibernate
- Clean and responsive frontend

##  Technologies Used

### Frontend
- HTML5, CSS
- JavaScript (jQuery)
- [jQuery Modal by Kyle Fox](https://github.com/kylefox/jquery-modal)

### Backend
- Java 17+
- Spring Boot (Spring MVC, Spring Data JPA)
- Hibernate ORM
- MySQL database



## ⚙️ Setup Instructions

### Prerequisites

- Java 17+
- Maven
- MySQL Server

### Clone and Configure

1. Clone the repository:
   ```bash
   git clone https://github.com/KampososDimitris/UserApp.git
   cd UserApp
   ```

2. Configure your database in `application.properties`:
   Create `src/main/resources/application.properties` and add your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/userappdb
   spring.datasource.username=your_db_username
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   ```

### Run the App

```bash
./mvnw spring-boot:run
```

Visit [http://localhost:8080/register.html](http://localhost:8080/register.html) to use the app.



