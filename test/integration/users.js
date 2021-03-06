import test from 'ava'
import { beforeEach, afterEach } from '../setup'

const ctx = {}

test.beforeEach(beforeEach.bind(ctx))
test.afterEach(afterEach.bind(ctx))

test.todo('users - throws an error if there is missing or invalid parameters creating new one')
test.todo('users - can create a new one')
test.todo('users - can edit basic profile information')
test.todo('users - can change password')
test.todo('users - can perform login and generate a session token')
test.todo('users - can validate a pending of validation account')
