#!/bin/bash

# Check if migration name is provided as an argument
if [ -z "$1" ]; then
  echo "Please provide a migration name."
  exit 1
fi

# Store the migration name from the first argument
MIGRATION_NAME=$1

# Run the TypeORM migration generate command
npm run typeorm migration:generate -- -d src/data-source.ts src/migration/migrate/${MIGRATION_NAME}

# Check if the command was successful
if [ $? -eq 0 ]; then
  echo "Migration $MIGRATION_NAME generated successfully!"
else
  echo "Failed to generate migration $MIGRATION_NAME."
fi
