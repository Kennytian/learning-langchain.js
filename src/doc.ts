import { Document } from "langchain/document";

const doc = new Document({ pageContent: "foo" });
const doc2 = new Document({ pageContent: "foo", metadata: { source: "1" } });
