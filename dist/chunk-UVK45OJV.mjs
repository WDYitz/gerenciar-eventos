import {
  BadRequest
} from "./chunk-UX6HP52O.mjs";
import {
  prisma
} from "./chunk-GGSLKEPP.mjs";

// src/routes/get-event.ts
import z from "zod";
var getEvent = async (app) => {
  app.withTypeProvider().get("/events/:eventId", {
    schema: {
      summary: "Get a event",
      tag: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        200: z.object({
          event: z.object({
            id: z.string().uuid(),
            title: z.string(),
            slug: z.string(),
            details: z.string().nullable(),
            maximunAttendees: z.number().int().nullable(),
            attendeesAmount: z.number().int()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true,
        slug: true,
        details: true,
        maximunAttendees: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: {
        id: eventId
      }
    });
    if (event === null) {
      throw new BadRequest("Event not found");
    }
    return reply.send({
      event: {
        id: event.id,
        title: event.title,
        slug: event.slug,
        details: event.details,
        maximunAttendees: event.maximunAttendees,
        attendeesAmount: event._count.attendees
      }
    });
  });
};

export {
  getEvent
};
