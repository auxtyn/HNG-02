import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="relative">
      {/* Decorative circle */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50" />
      
      {/* Hero section with wave */}
      <div className="relative wave-bg pb-32">
        <div className="pt-20 pb-40 px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Ticket Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your support workflow with our intuitive ticket management solution
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-500 px-6 py-3 rounded-lg border-2 border-blue-500 hover:bg-blue-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Feature boxes */}
      <div className="grid md:grid-cols-3 gap-8 px-4 -mt-20">
        {[
          {
            title: 'Easy Ticket Creation',
            description: 'Create and manage tickets with just a few clicks'
          },
          {
            title: 'Real-time Updates',
            description: 'Stay informed with instant status updates'
          },
          {
            title: 'Secure Access',
            description: 'Role-based access control for your team'
          }
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Landing