import {
  getEvent
} from "./chunk-UVK45OJV.mjs";
import {
  registerForEvent
} from "./chunk-JTXK2B36.mjs";
import {
  errorHandler
} from "./chunk-CLYNYZHE.mjs";
import {
  checkIn
} from "./chunk-XYZCAEK7.mjs";
import {
  createEvent
} from "./chunk-WCRTCMJZ.mjs";
import "./chunk-5YZ673FI.mjs";
import {
  getAttendeeBadge
} from "./chunk-SN3BHHDK.mjs";
import "./chunk-UX6HP52O.mjs";
import {
  getEventAttendees
} from "./chunk-PU2QLTLQ.mjs";
import "./chunk-GGSLKEPP.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API para o back-end da aplica\xE7\xE3o pass.in",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("\u{1F680} HTTP server running!");
});
