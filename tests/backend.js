import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const app = express();

// Allow CORS for all origins.
app.use(cors());

const port = 5001;

// Function to generate a random document object.
function generateDocument() {
  return {
    language: faker.helpers.arrayElement(["EN", "FR", "DE"]),
    title: faker.lorem.sentence(),
    source: faker.company.name(),
    source_url: faker.internet.url(),
    source_ref: faker.number.int({ min: 100000, max: 999999 }),
    source_date: faker.date.recent().toISOString(),
    extra: {
      content_type: "text",
      result_id: faker.string.uuid(),
      file_id: faker.string.uuid(),
      file_name: faker.system.fileName(),
      meta_file_name: faker.system.fileName(),
      page: faker.number.int({ min: 1, max: 10 }),
      commissionerCodes: faker.helpers.arrayElements(
        ["MCGUINNES", "VESTAGER", "SEFCOVIC"],
        1,
      ),
      docuType: faker.helpers.arrayElement(["SPEECH", "IP", "MEX"]),
      eventDate: faker.date.future().toISOString().split("T")[0],
      extra_id: faker.number.int({ min: 100000, max: 999999 }),
      original: true,
      placeKy: faker.number.int({ min: 1000, max: 99999 }),
      policyCodes: faker.helpers.arrayElements(
        ["FINSTAB", "PR-GREENDEAL", "PR-DIGITAL", "CLIMACTION"],
        2,
      ),
      refCode: `SPEECH/${faker.number.int({ min: 1, max: 9999 })}/${faker.number.int({ min: 1, max: 9999 })}`,
      subTitle: faker.lorem.sentence(),
    },
    pending_review: null,
    assignee: null,
    id: faker.string.uuid(),
    content: faker.lorem.paragraphs(3),
    score: faker.number.float({ min: 0, max: 1 }),
    rating: faker.helpers.arrayElement(["A", "B", "C", "D", "E"]),
    keywords: faker.lorem.words(3),
  };
}

app.get("/ask", (req, res) => {
  const numberOfDocuments = faker.number.int({ min: 3, max: 10 });
  const documents = Array.from({ length: numberOfDocuments }, () =>
    generateDocument(),
  );
  const answer = faker.lorem.paragraphs({ min: 1, max: 5 });
  res.json({ answer, documents });
});

// Start the server
app.listen(port, () => {
  console.log(`Mock service running at http://127.0.0.1:${port}`);
});
