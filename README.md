# 🌞 Solar Track

**Solar Track** is a complete full-stack web application that allows administrators to manage solar panel installation projects, assign project leaders, track progress, and view detailed statistics through charts and dashboards.

---

## 🧰 Technologies Used

### 🖥️ Frontend – [React](https://reactjs.org/)

* React + Vite for fast and modern development.
* Material UI (MUI) for UI components.
* Recharts for data visualization.
* React Router DOM for navigation.
* Context API for authentication and toast alerts.
* Axios for HTTP requests.

### ⚙️ Backend – [Django 5.2 + Django REST Framework](https://www.djangoproject.com/)

* PostgreSQL database hosted on Render.
* RESTful API using DRF.
* JWT Authentication with `djangorestframework-simplejwt`.
* Cloudinary for image and media uploads.
* CORS headers and API documentation via DRF Spectacular.

---

## 📊 Features

### ✅ Admin Features

* Add / Delete / Update Projects.
* Assign Leaders to each project.
* Activate / Deactivate Leaders.
* Monitor progress of projects by date and number of installed panels.
* View detailed dashboard statistics (active projects, installed panels, etc.)
* Visualized data using charts (bar, pie).

### 📁 Project Structure

```
solar-track/
├── backend/        # Django backend
│   ├── users/      # Custom user model and logic
│   ├── projects/   # Project models, views, serializers
│   ├── progress/   # Project progress tracking
│   ├── project/    # Django settings and URLs
│   └── ...
├── frontend/       # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── ...
```

---



## 📊 Dashboard Preview

* **Total Projects** (active/inactive)
* **Installed Panels**
* **Projects per Leader**
* **Charts**:

  * Bar Chart: Projects per Leader
  * Pie Chart: Active vs Inactive Projects

---

## 👤 Authentication

* Custom User Model with roles (Admin, Leader)
* JWT-based login/logout.
* Context API for maintaining user session.

---

## 📸 Media Handling

* All uploaded files (e.g. profile images) are stored on Cloudinary.
* Cloudinary is integrated using `django-cloudinary-storage`.

