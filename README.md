# peach
peach is a mostly-pure GraphQL server for hackathon registrations, it is recommended to use this alongside [mango](http://github.com/hackfiu/mango).

We say "mostly" due to the following:

Due to the nature of email verification, we must add a `GET` route on which we receive the token via a query on the request, the structure of the link should look something like `http://mangohacks.com/verify?token=json.web.token`.

And inside the JWT we need only the following data:
```json
{
  "email": "you@yourschool.edu"
}
```

Asides from this, we run a pure GraphQL server.

The schema should contain all the necessary information to understand the structure and usage of the server, it can be found in `src/schema.gql`, and it contains the following:

```graphql
type User {
  email: String!
  password: String!
  level: Level!
  status: Status
  team: Team
  application: Application!
}

type Team {
  members: [User!]
}

type Application {
  firstName: String
  lastName: String
  levelOfStudy: LevelOfStudy
  major: String
  shirtSize: ShirtSize
  gender: Gender
}

type Query {
  info: String!
}

type Mutation {
  signUp(email: String!, password: String!): String!
  logIn(email: String!, password: String!): String!
}

enum Level {
  HACKER
  SPONSOR
  ADMIN
}

enum Status {
  UNVERIFIED
  VERIFIED
  REJECTED
  WAITLISTED
  ACCEPTED
  CONFIRMED
}

enum ShirtSize {
  XSMALL
  SMALL
  MEDIUM
  LARGE
  XLARGE
}

enum LevelOfStudy {
  FRESHMAN
  SOPHOMORE
  JUNIOR
  SENIOR
  SENIORPLUS
}

enum Gender {
  MALE
  FEMALE
  OTHER
  NORESPONSE
}
```
