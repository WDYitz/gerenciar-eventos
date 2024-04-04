import {
  BadRequest
} from "./chunk-UX6HP52O.mjs";
import {
  prisma
} from "./chunk-GGSLKEPP.mjs";

// src/routes/register-for-event.ts
import { z } from "zod";
var registerForEvent = async (app) => {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register a attendee",
      tag: ["attendees"],
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    });
    if (attendeeFromEmail !== null) {
      throw new BadRequest("this e-mail is already registered for this event");
    }
    const [event, amountfOfAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (event?.maximunAttendees && amountfOfAttendeesForEvent >= event?.maximunAttendees) {
      throw new Error("The maximum number of attendees for this event has been reached");
    }
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
};

export {
  registerForEvent
};
