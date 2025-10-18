import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../views/Home.vue'

describe('Home.vue', () => {
  it('renders welcome message', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('Welcome to VueWork')
  })

  it('displays stats cards', () => {
    const wrapper = mount(Home)
    const statsCards = wrapper.findAll('.stats-card')
    expect(statsCards.length).toBeGreaterThan(0)
  })

  it('shows recent activity section', () => {
    const wrapper = mount(Home)
    expect(wrapper.find('.recent-activity').exists()).toBe(true)
  })
})
