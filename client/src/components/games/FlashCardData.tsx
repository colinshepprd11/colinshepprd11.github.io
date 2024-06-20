/*
I am a fullstack software engineer. Create 10 extremely challenging flashcards with useful technology information on a single topic. 
I am using the response programmatically so  I need the flashcards to be in exactly this format with no additional text in the response:   
{topic:"topic",cards:[{front:"front of card 1", back: "back of card 1"},]}


*/

const FlashCardData = [
  {
    topic: "GraphQL",
    cards: [
      {
        front:
          "What is the primary language used to define the schema in GraphQL?",
        back: "GraphQL Schema Definition Language (SDL)",
      },
      {
        front:
          "Describe the purpose of the 'resolve' function in a GraphQL server.",
        back: "The 'resolve' function is responsible for fetching the data for a specific field in the GraphQL query.",
      },
      {
        front: "Explain the concept of 'GraphQL Fragments' and their use.",
        back: "Fragments allow you to reuse parts of the query to avoid schema redundancy and keep the query clean.",
      },
      {
        front: "What is the main difference between GraphQL and REST APIs?",
        back: "In GraphQL, clients can request exactly the data they need, whereas in REST APIs, clients have to fetch pre-defined endpoints, usually containing more data than necessary.",
      },
      {
        front: "How do you handle authentication and authorization in GraphQL?",
        back: "Typically, authentication is handled by passing JWT tokens in headers, and authorization logic is implemented in the 'resolve' functions or middleware.",
      },
      {
        front: "What are GraphQL Subscriptions and what are they used for?",
        back: "Subscriptions are used to push real-time updates to the client, enabling reactive communication between the server and client.",
      },
      {
        front:
          "Mention one of the major performance concerns with GraphQL and how to mitigate it.",
        back: "N+1 query problem is a performance concern; it can be mitigated using tools like DataLoader to batch and cache request calls.",
      },
      {
        front: "What is the role of 'introspection' in GraphQL?",
        back: "Introspection allows clients to query the schema of the GraphQL API, providing metadata about the types and queries supported by the server.",
      },
      {
        front:
          "Can you describe what a 'GraphQL middleware' is and give an example of its use?",
        back: "Middleware in GraphQL, such as 'graphql-middleware,' allows you to apply business logic, like authentication or logging, around your resolvers.",
      },
      {
        front:
          "What are 'Apollo Client' and 'Apollo Server' in the context of GraphQL?",
        back: "'Apollo Client' is a comprehensive state management library for JavaScript, optimized for GraphQL, while 'Apollo Server' is an open-source GraphQL server that works with any GraphQL schema.",
      },
    ],
  },
  {
    topic: "Kubernetes",
    cards: [
      {
        front: "What is the role of the Kubernetes API server?",
        back: "The API server is the frontend of the Kubernetes control plane, responsible for exposing the Kubernetes API, handling RESTful operations, and processing internal and external requests.",
      },
      {
        front: "Explain the function of a Kubernetes 'etcd' store.",
        back: "etcd is a distributed key-value store that stores all cluster data critical for Kubernetes operation, such as configuration data, state, and metadata.",
      },
      {
        front:
          "What does the 'kube-scheduler' do in the Kubernetes architecture?",
        back: "The kube-scheduler watches for newly created Pods with no assigned node and selects a node for them to run on based on resource availability and other constraints.",
      },
      {
        front: "Describe the main components of a Kubernetes 'Pod'.",
        back: "A Pod is the smallest deployable unit in Kubernetes and can contain one or more containers, shared storage/network, and options on how to run them.",
      },
      {
        front:
          "What is a 'Kubernetes Operator' and what problem does it solve?",
        back: "An Operator is a method of packaging, deploying, and managing a Kubernetes application by extending the Kubernetes API and enabling custom resource management, automating complex tasks beyond basic CRUD operations.",
      },
      {
        front:
          "How does Kubernetes achieve high availability for applications?",
        back: "Kubernetes achieves high availability through replication, load balancing, auto-scaling, and self-healing capabilities that ensure applications are resilient to failure and can scale as needed.",
      },
      {
        front: "What is the purpose of a 'Kubernetes Namespace'?",
        back: "Namespaces provide a mechanism for isolating groups of resources within a single Kubernetes cluster, enabling multi-tenancy and organizing cluster resources.",
      },
      {
        front: "Explain the concept of 'Kubernetes Ingress' and its use case.",
        back: "Ingress is an API object that manages external access to services within a Kubernetes cluster, typically HTTP, enabling routing rules, SSL termination, and load balancing.",
      },
      {
        front: "What problems do 'Kubernetes ConfigMaps' and 'Secrets' solve?",
        back: "ConfigMaps and Secrets decouple configuration artifacts from image content to keep containerized applications portable. ConfigMaps store configuration data as key-value pairs, while Secrets store sensitive data like passwords and keys.",
      },
      {
        front:
          "Describe how 'Kubernetes Helm' simplifies application deployment.",
        back: "Helm is a package manager for Kubernetes that uses 'Charts' to define, install, and upgrade even the most complex Kubernetes applications, enhancing productivity and managing applications more easily.",
      },
    ],
  },
];

export default FlashCardData;
