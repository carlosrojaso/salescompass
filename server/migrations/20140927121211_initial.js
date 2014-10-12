'use strict';

exports.up = function(knex, Promise) {
  var schema = knex.schema;

  return Promise.all([
    schema.hasTable('users').then(function(exists) {
      if (!exists) {
        // console.log("Creating users table");
        return schema.createTable('users', function(table) {
          table.increments('id');
          table.string('name').notNullable().index();
          table.string('email').notNullable();
          table.string('crypted_password').notNullable();
          table.string('token').index();
          table.boolean('is_admin').defaultTo(false);
          table.timestamps();
          // console.log("done with users table");
        });
      } else {
        return schema;
      }
    }),
    schema.hasTable('pages').then(function(exists) {
      if (!exists) {
        // console.log("Creating pages table");
        return schema.createTable('pages', function(table) {
          table.increments('id');
          table.timestamps();
          // console.log("done with pages table");
        });
      } else {
        return schema;
      }
    }),
    schema.hasTable('answers').then(function(exists) {
      if (!exists) {
        // console.log("Creating answers table");
        return schema.createTable('answers', function(table) {
          table.increments('id');
          table.string('text');
          table.integer('page_id').references('pages.id');
          table.timestamps();
        });
      } else {
        return schema;
      }
    }),
    schema.hasTable('scripts').then(function(exists) {
      if (!exists) {
        // console.log("Creating scripts table");
        return schema.createTable('scripts', function(table) {
          table.increments('id');
          table.string('text');
          table.integer('answer_id').references('answers.id');
          table.timestamps();
          // console.log("done with scripts table");
        });
      } else {
        return schema;
      }
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pages'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('answers'),
    knex.schema.dropTable('scripts')
  ]);
};
