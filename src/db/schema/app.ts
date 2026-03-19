import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(()=> new Date()).notNull()
}
export const departments = pgTable("departments", {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    code: varchar('code', {length:50}).notNull().unique(),
    name: varchar('name', {length:255}).notNull(),
    description: varchar('description', {length:255}),
    ...timestamps

})

export const subjects = pgTable("subjects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 50 }).notNull().unique(),
    description: text("description"),
    departmentId: integer("department_id").references(() => departments.id, {onDelete: 'restrict'}).notNull(),
    ...timestamps
});
export const departmentsRelations = relations(departments, ({ many }) => ({
  subjects: many(subjects)
}));

export const subjectsRelations = relations(subjects, ({ one }) => ({
  department: one(departments, {
    fields: [subjects.departmentId],
    references: [departments.id]
  })
}));

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
export type Subjects = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;
