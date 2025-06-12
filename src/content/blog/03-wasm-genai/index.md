---
title: "The Future of AI Computing: WASM and GenAI"
description: My long term bet on Web Assembly (WASM) and Generative AI (GenAI) to power the future of AI computing.
date: 2 December 2024
slug: wasm-genai
---

> This article was also published on the YLD blog [here](https://www.yld.io/blog/the-key-to-building-smarter-scalable-ai-powered-applications).

While Generative AI (GenAI) has taken centre stage, Web Assembly (WASM) works in the background, complementing GenAI by shifting how we approach performance, portability, and security in web and cross-platform applications.

While these technologies may seem distinct, their combination unlocks exciting possibilities: WASM’s ability to deliver near-native performance in constrained environments perfectly complements the computation-heavy demands of GenAI models.

Together, they create a powerful partnership, improving how we deploy and experience AI-driven applications.

This article explores how GenAI and WASM work together to unlock new possibilities for businesses using AI applications. You will also learn some strategies to harness their full potential with accessibility and scalability in mind.

## A perfect pair for the future of AI computing

WASM is a low-level, portable binary instruction format designed for safe, efficient execution across various environments. Initially created to enhance web application performance, it has quickly extended its reach to edge computing, serverless platforms, and embedded systems. Its appeal lies in three key strengths:

- Near-native performance
- Portability as a universal execution target
- Security through its sandboxed environment (especially in browsers)

By decoupling code execution from specific platforms or architectures, WASM allows developers to build once and deploy anywhere, making this function an ideal approach to developing modern, distributed applications. 

The rise of Vercel-like WASM-focused companies highlights the growing adoption of WASM’s unique benefits for developers. With WASM, developers gain greater autonomy and flexibility, enabling them to build and deploy high-performance applications without being tied to specific platforms. Additionally, companies using WASM can optimise performance while minimising resource usage, making the process of building and deploying applications much more efficient.

Generative AI, on the other hand, has rapidly advanced with models like o1 and Deepseek-R1 now capable of creating human-like text, generating realistic images, and even writing functional code. These models rely on vast amounts of training data and significant computational power, highlighting their potential for major innovation. At the same time, they spark important discussions about the resources required and the ethical considerations surrounding this powerful technology.

## Opportunities, challenges, and key considerations

GenAI models are computationally intensive, making them difficult to deploy in resource-constrained environments. Real-time applications, which require fast responses, face challenges with traditional deployment methods, as they struggle to process data quickly enough. This leads to slower performance or, in some cases, failure to deploy. While tools like Ollama have proven that most models can run locally, the performance that you can find on basic devices, such as entry-level smartphones or laptops, is typically much lower than on more powerful systems like the one you’re reading this on.

However, despite these limitations, GenAI makes an excellent candidate for optimisation through WASM because WASM can make AI applications more accessible across a range of devices. While WASM offers a lightweight and portable execution environment, its ability to address GenAI challenges largely depend on the specific use case and optimisation strategies. Here are some key points to consider:

1. **Portability**: GenAI models compiled into WASM modules can run across platforms like browsers and edge devices. However, achieving smooth operation may require significant optimisations and adjustments for each environment.
2. **Efficiency**: WASM can improve inference performance in local setups, but the benefits may be limited for larger GenAI models or more complex workloads due to WASM’s current hardware limitations.
3. **Scalability**: Serverless platforms adopting WASM can simplify GenAI model deployment.
4. **Privacy**: WASM can help prioritise privacy by enabling GenAI models to run locally, but this approach may involve trade-offs in terms of model complexity and computational overhead.

For example, a WASM module could host a language model directly in a web browser, enabling offline chatbots without needing server connectivity. While tools like Ollama already offer similar functionality, WASM allows for browser-based deployment, which brings the flexibility that comes with the browser.

## Real-world use cases

In the real world, we’re already seeing examples of WASM and GenAI working together, like [Whisper running directly in the browser](https://whisper.ggerganov.com/). This hybrid approach allows users to choose the model and adjust performance according to their needs. There are exciting possibilities on the horizon where WASM and GenAI could combine to create innovative solutions. Here are a few examples: 

- **In-Browser AI Assistants**: Deploy lightweight GenAI models directly in browsers using WASM, providing real-time assistance without network latency.
- **Edge Device Applications**: Run WASM-optimised GenAI models on IoT devices for tasks like image recognition or anomaly detection.
- **Serverless AI APIs**: Host GenAI models as WASM modules on serverless platforms, reducing operational costs while improving scalability.

These use cases demonstrate how WASM empowers GenAI to operate efficiently in diverse environments, from cloud servers to smaller edge devices.

## Overcoming barriers to realise WASM and GenAI’s full potential

While the combination of WASM and GenAI promises a lot of great things, several challenges must be addressed:

- **GPU Limitations**: WASM currently lacks native GPU support, making it difficult to accelerate GenAI workloads that rely on parallel processing, a critical feature for handling large-scale AI tasks.
- **Memory Constraints**: This compute boundary is a significant hurdle for WASM when working with AI workloads requiring high levels of parallelism. Furthermore, large GenAI models often exceed WASM’s default memory limits, necessitating careful optimisation to fit these constraints. 
- **Early-stage Ecosystem**: While WASM is evolving rapidly, tools and libraries for integrating WASM with AI frameworks are still maturing, highlighting the ecosystem’s early-stage nature.

Emerging tools like WebLLM and platforms such as Turso are addressing some of these limitations in innovative ways. For example, WebLLM demonstrates the feasibility of running large language models directly in the browser by leveraging WebGPU for acceleration. It’s important to note that WebGPU is still an experimental API, and its integration with WASM for AI workloads is in its early stages, requiring further development and testing. 

Similarly, Turso, a distributed database built on libSQL, has introduced features like native vector search and 1-bit quantisation for vector embeddings. These advancements make it easier to deploy AI applications that prioritise local-first processing and efficient resource usage. However, both WebLLM and Turso highlight the gaps in WASM’s ecosystem, such as the need for GPU integration and optimised toolchains for AI workloads. Addressing these challenges will be key to unlocking the full potential of this pairing.

## How WASM and GenAI are redefining the future of software development

Looking ahead, advancements in both WASM and GenAI promise to deepen their integration through the following ways:

1. **WebGPU Support**: Introducing WebGPU to WASM environments will enable hardware acceleration for AI workloads. However, it's worth noting that [WebGPU is still an experimental API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API), and its integration with WASM for AI workloads is in the early stages, requiring further development and testing.
2. **Model Optimisation**: Techniques like quantisation and pruning will make it easier to deploy GenAI models within WASM’s constraints.
3. **Standardised Toolchains**: Improved tooling will simplify the process of compiling and deploying GenAI models as WASM modules.
4. **Private Personal Assistants**: Having the model run locally will open up the possibilities to protect the end user from endless data-sharing, one that is a given if the benefits of using AI keep increasing.

These developments are set to enable real-time, AI-driven applications that are fast, portable, and accessible to a wide range of users.

WASM and GenAI are two disruptive technologies poised to change how we build and deploy software. WASM’s portability and performance make it an ideal runtime for GenAI, enabling the creation of applications that are both powerful and accessible.

As these technologies continue to evolve, now is the time for developers to explore their synergy. Whether you’re building the next-gen AI assistant, a cutting-edge edge computing solution, or serverless applications, the pairing of WASM and GenAI offers endless possibilities to be unlocked.
