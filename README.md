Break down of Task for the this RAG system
Start
↓
[Document Upload]
↓
[Extract Text from Document] → (PDF, DOCX, JSON, TXT)
↓
[Chunk Text] → (Split large documents into smaller chunks)
↓
[Generate Embeddings] → (Using Hugging Face model)
↓
[Store Embeddings in Weaviate] → (With metadata like document ID, text snippet)
↓
[Wait for User Query]
↓
[User Query Received]
↓
[Generate Embedding for Query] → (Using the same Hugging Face model)
↓
[Retrieve Relevant Documents] → (From Weaviate using vector search)
↓
[Return Relevant Text Snippets] → (With metadata like document ID, snippet)
↓
End
