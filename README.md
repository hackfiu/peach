# peach
peach is a pure GraphQL server for hackathon registrations, it is recommended to use this alongside [mango](http://github.com/hackfiu/mango).

The schema should contain all the necessary information to understand the structure and usage of the server, it can be found in `src/schema.gql`, and it contains the following:

```graphql
type User {
  id: ID!
  email: String!
  password: String!
  level: Level!
  status: Status
  team: Team
  application: Application
}

type Team {
  members: [User!]
}

type Application {
  id: ID!
  firstName: String
  lastName: String
  levelOfStudy: LevelOfStudy
  major: String
  shirtSize: ShirtSize
  gender: Gender
}

type Query {
  user(id: ID!): User!
  application(id: ID!): Application!
  info: String!
}

type Token {
  token: String!
}

type Mutation {
  signUp(email: String!, password: String!)
  logIn(email: String!, password: String!): Token!
  verify(token: Token!): Token!
  updateApplication(
    firstName: String
    lastName: String
    levelOfStudy: LevelOfStudy
    major: String
    shirtSize: ShirtSize
    gender: Gender
  ): Application!
  submitApplication(
    firstName: String!
    lastName: String!
    levelOfStudy: LevelOfStudy!
    major: String!
    shirtSize: ShirtSize!
    gender: Gender!
  ): Application!
}

enum Level {
  HACKER
  SPONSOR
  ADMIN
}

enum Status {
  UNVERIFIED
  VERIFIED
  SUBMITTED
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
