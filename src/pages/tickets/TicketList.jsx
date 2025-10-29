import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import ErrorBoundary from '../../components/ErrorBoundary'
import LoadingSpinner from '../../components/LoadingSpinner'

const statusColors = {
  open: 'bg-green-100 text-green-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-800'
}

const TicketList = () => {
  const [tickets, setTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'newest'
  })

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]')
        setTickets(savedTickets)
        setFilteredTickets(savedTickets)
      } catch (err) {
        setError('Failed to load tickets')
        toast.error('Failed to load tickets')
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  useEffect(() => {
    let result = [...tickets]

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(ticket => ticket.status === filters.status)
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      result = result.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.description.toLowerCase().includes(searchTerm)
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      return new Date(a.createdAt) - new Date(b.createdAt)
    })

    setFilteredTickets(result)
  }, [tickets, filters])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      try {
        const updatedTickets = tickets.filter(ticket => ticket.id !== id)
        localStorage.setItem('tickets', JSON.stringify(updatedTickets))
        setTickets(updatedTickets)
        setFilteredTickets(updatedTickets)
        toast.success('Ticket deleted successfully')
      } catch (error) {
        toast.error('Failed to delete ticket')
      }
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>

  return (
    <ErrorBoundary>
      <div className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Tickets</h1>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.status}
              onChange={e => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="border rounded px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filters.sortBy}
              onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="border rounded px-3 py-2"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <input
              type="text"
              placeholder="Search tickets..."
              value={filters.search}
              onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="border rounded px-3 py-2"
            />

            <Link
              to="/tickets/new"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create New Ticket
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredTickets.map(ticket => (
            <div key={ticket.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
                  <p className="text-gray-600 mb-4">{ticket.description}</p>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[ticket.status]}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/tickets/${ticket.id}/edit`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {filters.search || filters.status !== 'all' ? 
                'No tickets match your filters' : 
                'No tickets found. Create your first ticket!'}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default TicketList