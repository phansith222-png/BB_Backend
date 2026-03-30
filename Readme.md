Project Bigbode
===

## env guide  
PORT=3000  
DATABASE_URL=  
JWT_SECRET=

---

# SERVICES

### Authentication
|path |method |authen |params |query |body |
|:-- |:--|:--|:--|:--|:--|
|/api/auth/register|post|-|-|-|{ identity,username, password, firstName, lastName, date_of_birth}
|/api/auth/login|post|-|-|-|(username,password)

---

### User
|path |method |authen |params |query |body |
|:-- |:--|:--|:--|:--|:--|
|/api/users/me|GET|-|-|-|-
|/api/users/me|PATCH|-|-|-|(firstName,lastName,date_of_birth)
|/api/users/history |GET|-|-|-|-
|/api/users/saved-readings|POST|-|-|-|-
|/api/users/saved-readings|GET|-|-|-|-
|/api/users/saved-readings/:id|DELETE|-|-|-|-

---

### Reading
|path |method |authen |params |query |body |
|:-- |:--|:--|:--|:--|:--|
|/api/readings/init|POST|-|-|-|(spreadId,question)
|/api/readings/shuffle |POST|-|-|-|(readingId,times)
|/api/readings/cut |POST|-|-|-|(readingId,position)
|/api/readings/pick |POST|-|-|-|(readingId,SelectId)
|/api/readings/:id/ai-interpret |POST|-|-|-|-
|/api/readings/spread/:id |GET|-|-|-|-

---

### Library
|path |method |authen |params |query |body |
|:-- |:--|:--|:--|:--|:--|
|/api/cards|GET|-|-|-|-
|/api/cards/:id |GET|-|-|-|-

---

### AI Chat bot
|path |method |authen |params |query |body |
|:-- |:--|:--|:--|:--|:--|
|/api/chat/send|POST|-|-|-|-
|/api/chat/history/:readingId |GET|-|-|-|-
|/api/chat/:readingId|DELETE|-|-|-|-



---

### ADMIN
|path |method |authen |params |query |body |
|:-- |:--|:--|:--|:--|:--|
|/api/admin/spread |POST|-|-|-|-
|/api/admin/spread/:id |DELETE|-|-|-|-
