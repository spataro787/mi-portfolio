import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import chat from "../api/chat.js";

const originalFetch = globalThis.fetch;
const originalKey = process.env.GEMINI_API_KEY;

before(() => {
  process.env.GEMINI_API_KEY = "clave-de-prueba";
});

after(() => {
  globalThis.fetch = originalFetch;

  if (originalKey === undefined) {
    delete process.env.GEMINI_API_KEY;
  } else {
    process.env.GEMINI_API_KEY = originalKey;
  }
});

function request(message) {
  return new Request("https://portfolio.example/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
}

test("rechaza métodos distintos de POST", async () => {
  const response = await chat.fetch(
    new Request("https://portfolio.example/api/chat"),
  );

  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
});

test("rechaza preguntas vacías o demasiado largas", async () => {
  for (const message of [" ", "a".repeat(501)]) {
    const response = await chat.fetch(request(message));
    assert.equal(response.status, 400);
  }
});

test("no llama a Gemini cuando falta la clave", async () => {
  delete process.env.GEMINI_API_KEY;
  globalThis.fetch = () => {
    throw new Error("No debería llamar a Gemini");
  };

  const response = await chat.fetch(request("¿Quién es Agustín?"));

  assert.equal(response.status, 503);
  process.env.GEMINI_API_KEY = "clave-de-prueba";
});

test("envía el perfil y la pregunta a Gemini y devuelve su respuesta", async () => {
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers["x-goog-api-key"], "clave-de-prueba");

    const payload = JSON.parse(options.body);
    assert.match(
      payload.systemInstruction.parts[0].text,
      /2 de noviembre de 1990/,
    );
    assert.match(payload.systemInstruction.parts[0].text, /Córdoba/);
    assert.equal(
      payload.contents[0].parts[0].text,
      "¿Dónde vive Agustín?",
    );

    return Response.json({
      candidates: [
        { content: { parts: [{ text: "Vive en Córdoba, Argentina." }] } },
      ],
    });
  };

  const response = await chat.fetch(request("  ¿Dónde vive Agustín?  "));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    reply: "Vive en Córdoba, Argentina.",
  });
});

test("devuelve un error controlado si Gemini falla", async () => {
  globalThis.fetch = async () =>
    new Response("Error del proveedor", { status: 429 });

  const response = await chat.fetch(request("¿Qué proyectos hizo?"));

  assert.equal(response.status, 502);
  assert.equal(typeof (await response.json()).error, "string");
});