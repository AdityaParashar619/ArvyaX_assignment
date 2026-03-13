
# System Architecture

## Overview

The system follows a layered architecture:

Routes → Controllers → Services → Database

This separation ensures maintainability, scalability, and easier integration of AI services.

---

## Backend Flow

1. The frontend sends requests to REST API endpoints.
2. Routes handle HTTP endpoints.
3. Controllers process request logic.
4. Services handle business logic such as emotion analysis.
5. MongoDB stores journal entries and metadata.

---

## Data Flow

User → Frontend → API → Controller → Service → Database

Emotion analysis occurs inside the service layer before results are returned to the client.

---

## Scaling to 100k Users

To support large-scale usage:

- Deploy backend behind a load balancer
- Use containerization (Docker + Kubernetes)
- Use a managed MongoDB cluster
- Add Redis caching layer
- Use background workers for AI processing

---

## Reducing LLM Cost

If using a large language model:

- Cache analysis results
- Analyze each journal entry only once
- Use smaller models for simple tasks
- Batch multiple requests when possible

---

## Caching Repeated Analysis

Repeated analysis of the same text can be cached using Redis.

Workflow:

1. Check if analysis exists in cache
2. If found → return cached result
3. If not → call AI service
4. Store result in cache

This reduces API costs and improves performance.

---

## Protecting Sensitive Journal Data

Journal entries may contain personal information.

Security measures include:

- HTTPS encryption
- API authentication using JWT
- Database encryption
- Access control for user data
- Secure storage of API keys