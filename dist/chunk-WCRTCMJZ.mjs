import {
  generateSlug
} from "./chunk-5YZ673FI.mjs";
import {
  BadRequest
} from "./chunk-UX6HP52O.mjs";
import {
  prisma
} from "./chunk-GGSLKEPP.mjs";

// src/routes/create-events.ts
import { z } from "zod";
var createEvent = async (app) => {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create a event",
      tag: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximunAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const { title, details, maximunAttendees } = request.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug !== null) {
      throw new BadRequest("Another event with same title already exists");
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximunAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
};

export {
  createEvent
};
