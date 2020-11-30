[
  {
    "type": "postgres",
    "host": "localhost",
    "port": "",
    "username": "",
    "password": "",
    "database": "",
    "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "",
    "type": "",
    "host": "",
    "port": "",
    "database": "",
    "useUnifiedTopology": true,
    "entities": ["./src/modules/**/infra/typeorm/schemas/*.ts"]
  }
]
