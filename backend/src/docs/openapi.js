const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Fitness Flow API',
    version: '1.0.0',
    description: 'Reservation engine API with JWT auth, slots, and bookings.',
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Local development server',
    },
  ],
  tags: [
    { name: 'Health' },
    { name: 'Auth' },
    { name: 'Slots' },
    { name: 'Bookings' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              statusCode: { type: 'integer' },
            },
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          role: { type: 'string', enum: ['member', 'admin'] },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthSuccess: {
        type: 'object',
        properties: {
          user: { $ref: '#/components/schemas/User' },
          token: { type: 'string' },
        },
      },
      Slot: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          className: { type: 'string', nullable: true },
          bikeLabel: { type: 'string', nullable: true },
          startsAt: { type: 'string', format: 'date-time' },
          startsAtLabel: { type: 'string' },
          capacity: { type: 'integer' },
          bookedCount: { type: 'integer' },
          availableSeats: { type: 'integer' },
          status: { type: 'string', enum: ['open', 'closed'] },
          isFull: { type: 'boolean' },
        },
      },
      Booking: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          status: { type: 'string', enum: ['active', 'cancelled'] },
          userId: { type: 'integer' },
          slotId: { type: 'integer' },
          externalBookingId: { type: 'string', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          slot: {
            type: 'object',
            nullable: true,
            properties: {
              id: { type: 'integer' },
              title: { type: 'string' },
              className: { type: 'string', nullable: true },
              bikeLabel: { type: 'string', nullable: true },
              startsAt: { type: 'string', format: 'date-time' },
              capacity: { type: 'integer' },
              bookedCount: { type: 'integer' },
            },
          },
        },
      },
    },
  },
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'Service health',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    service: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 6 },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthSuccess' },
              },
            },
          },
          409: {
            description: 'Email already exists',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Authenticated',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthSuccess' },
              },
            },
          },
          401: {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Current user',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          401: {
            description: 'Missing/invalid token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/slots': {
      get: {
        tags: ['Slots'],
        summary: 'List slots',
        responses: {
          200: {
            description: 'Slot list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    slots: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Slot' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/bookings/me': {
      get: {
        tags: ['Bookings'],
        summary: 'List current user bookings',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Booking list',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    bookings: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Booking' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/bookings': {
      post: {
        tags: ['Bookings'],
        summary: 'Create booking for slot',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['slotId'],
                properties: {
                  slotId: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Booking created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    booking: { $ref: '#/components/schemas/Booking' },
                  },
                },
              },
            },
          },
          409: {
            description: 'Conflict (already booked or full)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
    '/api/bookings/{id}': {
      delete: {
        tags: ['Bookings'],
        summary: 'Cancel booking',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          200: {
            description: 'Booking cancelled',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    booking: { $ref: '#/components/schemas/Booking' },
                  },
                },
              },
            },
          },
          404: {
            description: 'Booking not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
};

export default openApiSpec;
