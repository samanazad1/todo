import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with default state', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('logs in user successfully', () => {
    const store = useAuthStore()
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' }
    const mockToken = 'test-token'

    store.login(mockUser, mockToken)

    expect(store.user).toEqual(mockUser)
    expect(store.token).toBe(mockToken)
    expect(store.isAuthenticated).toBe(true)
    expect(store.userName).toBe('Test User')
    expect(store.isAdmin).toBe(true)
  })

  it('logs out user successfully', () => {
    const store = useAuthStore()
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'admin' }
    store.login(mockUser, 'test-token')

    store.logout()

    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('updates user information', () => {
    const store = useAuthStore()
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'member' }
    store.login(mockUser, 'test-token')

    store.updateUser({ name: 'Updated Name' })

    expect(store.user.name).toBe('Updated Name')
    expect(store.user.email).toBe('test@example.com')
  })
})
