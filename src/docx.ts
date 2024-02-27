import { DocxLoader } from "langchain/document_loaders/fs/docx";

const loader = new DocxLoader(
  "src/document_loaders/tests/example_data/attention.docx",
);
