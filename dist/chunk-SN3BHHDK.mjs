import {
  BadRequest
} from "./chunk-UX6HP52O.mjs";
import {
  prisma
} from "./chunk-GGSLKEPP.mjs";

// src/routes/get-attendee-badge.ts
import { z } from "zod";
var getAttendeeBadge = async (app) => {
  app.withTypeProvider().get("/attendees/:attendeeId/badge", {
    schema: {
      summary: "Get an attendee badge",
      tag: ["attendee"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string().email(),
            eventTitle: z.string(),
            checkInURL: z.string().url()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id: attendeeId
      }
    });
    if (attendee === null) {
      throw new BadRequest("Attendee not found.");
    }
    const baseURL = `${request.protocol}://${request.hostname}`;
    const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL);
    return reply.send({
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event.title,
        checkInURL: checkInURL.toString()
      }
    });
  });
};

export {
  getAttendeeBadge
};
