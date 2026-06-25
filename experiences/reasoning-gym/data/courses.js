window.REASONING_GYM_COURSES = [
  {
    id: "information-theory",
    title: "Information Theory",
    sourcePath: "guide/",
    externalBenchmarks: [
      {
        label: "MIT 6.441 Information Theory",
        kind: "graduate problem sets and exams",
        url: "https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/",
        bestFor: "formal entropy, coding, channel capacity, and proof-level checks"
      },
      {
        label: "MIT 18.05 Probability and Statistics",
        kind: "prerequisite problem checker and exams",
        url: "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/problem-sets/",
        bestFor: "probability, expectation, Bayes, and random-variable prerequisites"
      },
      {
        label: "MIT 6.050J Information and Entropy",
        kind: "introductory problem sets",
        url: "https://ocw.mit.edu/courses/6-050j-information-and-entropy-spring-2008/",
        bestFor: "bits, codes, entropy intuition, and early practice"
      }
    ],
    conceptUniverse: {
      primitives: [
        "random variable",
        "distribution",
        "event",
        "code",
        "channel",
        "noise",
        "decoder",
        "loss",
        "model",
        "representation"
      ],
      representations: [
        "probability table",
        "entropy expression",
        "Venn-style information diagram",
        "code tree",
        "channel matrix",
        "rate-error curve",
        "Bayes table",
        "system diagram"
      ],
      reasoningMoves: [
        "name the random variables",
        "state the source distribution",
        "compute the smallest nontrivial case",
        "interpret units",
        "test an independence boundary",
        "change one assumption",
        "compare operational meanings"
      ],
      misconceptionFamilies: [
        "treating entropy as disorder without a source distribution",
        "treating mutual information as correlation",
        "confusing KL divergence with a distance",
        "treating capacity as raw bandwidth",
        "forgetting which distribution generates the expectation",
        "assuming processing can create information about a hidden source"
      ]
    },
    modules: [
      {
        id: "00-orientation",
        track: "Foundations",
        title: "Orientation and Mathematical Setup",
        summary: "What information theory studies, the notation you need, and how to use the guide.",
        concepts: ["random variable", "distribution", "logarithm", "operational meaning"],
        support: "high"
      },
      {
        id: "01-entropy",
        track: "Foundations",
        title: "Bits, Surprise, and Entropy",
        summary: "Measure uncertainty in bits, compute entropy, and connect entropy to average code length.",
        concepts: ["bit", "surprise", "entropy", "perplexity", "average code length"],
        support: "high",
        check: {
          primitives: "outcomes, probabilities, surprise values, expectation, bit units",
          representation: "probability table feeding H(X) = -sum p log2 p",
          tinyCase: "Compare H(0.5,0.5) with H(0.9,0.1). Explain which source needs more yes/no questions on average.",
          boundary: "What breaks if you say a single observed rare event has high entropy?",
          transfer: "Map entropy to a pantry inventory, a password generator, or a language-model next-token distribution. Keep the source distribution explicit.",
          external: "MIT 6.050J Units 1-3 or MIT 6.441 Problem Set 1"
        }
      },
      {
        id: "02-joint-conditional",
        track: "Foundations",
        title: "Joint and Conditional Information",
        summary: "Use the chain rule, conditional entropy, and Venn-style accounting for uncertainty.",
        concepts: ["joint entropy", "conditional entropy", "chain rule", "independence"],
        support: "high",
        check: {
          primitives: "two random variables, joint distribution, marginal distribution, conditional distribution",
          representation: "2x2 joint table plus Venn-style uncertainty accounting",
          tinyCase: "Let Y = X for a fair bit. Compute H(X), H(Y), H(X,Y), and H(X|Y).",
          boundary: "What breaks if you compute H(X|Y) from marginals only?",
          transfer: "Use the same structure for a medical test, a duplicated file, or two sensors measuring the same hidden state.",
          external: "MIT 18.05 conditional probability practice"
        }
      },
      {
        id: "03-mutual-kl",
        track: "Foundations",
        title: "Mutual Information, KL, and Cross-Entropy",
        summary: "Understand information gain, distribution mismatch, log loss, and perplexity.",
        concepts: ["mutual information", "KL divergence", "cross-entropy", "log loss"],
        support: "medium",
        check: {
          primitives: "true distribution p, model distribution q, observed pair, expectation distribution",
          representation: "Venn diagram for I(X;Y) and code-length table for KL",
          tinyCase: "For Y = X versus independent Y, explain why I(X;Y) changes from 1 bit to 0 bits.",
          boundary: "Why is KL(p||q) not a distance? Name one property it violates.",
          transfer: "Map KL to using the wrong grocery list, compression code, or language model. State what generates the data.",
          external: "MIT 6.441 early problem sets on entropy and divergence"
        }
      },
      {
        id: "04-source-coding",
        track: "Foundations",
        title: "Source Coding and Compression",
        summary: "Build prefix codes, run Huffman coding, and understand why compression approaches entropy.",
        concepts: ["prefix code", "expected length", "Huffman coding", "source coding theorem"],
        support: "medium",
        check: {
          primitives: "symbols, symbol probabilities, codewords, prefix constraint, expected length",
          representation: "binary code tree plus average-length table",
          tinyCase: "Given probabilities 0.5, 0.25, 0.25, propose a prefix code and compute average length.",
          boundary: "What breaks if a codeword is a prefix of another codeword?",
          transfer: "Map source coding to menu shortcuts, grocery abbreviations, or keyboard macros while keeping unique decoding visible.",
          external: "MIT 6.050J compression units or MIT 6.441 source coding problems"
        }
      },
      {
        id: "05-channels-capacity",
        track: "Foundations",
        title: "Noisy Channels and Capacity",
        summary: "Model noise with channels and compute the capacity of the binary symmetric channel.",
        concepts: ["channel", "capacity", "binary symmetric channel", "reliable rate"],
        support: "medium",
        check: {
          primitives: "input, output, transition probability, noise rate, code rate, decoder",
          representation: "channel matrix plus capacity curve",
          tinyCase: "For a binary symmetric channel with crossover p = 0.5, explain why capacity is zero.",
          boundary: "Why is capacity not the same thing as raw bandwidth?",
          transfer: "Map a noisy conversation, weak Wi-Fi link, or typo-prone text message to source-channel-decoder pieces.",
          external: "MIT 6.441 channel capacity assignments"
        }
      },
      {
        id: "06-error-correcting-codes",
        track: "Foundations",
        title: "Error-Correcting Codes",
        summary: "Learn Hamming distance, parity checks, redundancy, and the coding theorem intuition.",
        concepts: ["Hamming distance", "redundancy", "parity", "decoding radius"],
        support: "medium"
      },
      {
        id: "07-inference-learning",
        track: "Foundations",
        title: "Inference and Learning",
        summary: "Connect information gain, Bayes updates, sufficient statistics, and machine-learning losses.",
        concepts: ["Bayes update", "information gain", "sufficient statistic", "cross-entropy loss"],
        support: "medium",
        check: {
          primitives: "prior, likelihood, evidence, posterior, statistic, loss",
          representation: "Bayes table plus information-gain comparison",
          tinyCase: "Use a low base-rate event and a noisy positive test. Explain why the posterior may remain modest.",
          boundary: "What breaks if you ignore the base rate?",
          transfer: "Map the update to spam detection, diagnosis, A/B testing, or model training.",
          external: "MIT 18.05 Bayes and inference problem sets"
        }
      },
      {
        id: "08-capstone",
        track: "Foundations",
        title: "Foundations Capstone",
        summary: "Audit a message source, design a code, test a noisy channel, and explain the trade-offs.",
        concepts: ["source audit", "code design", "channel simulation", "trade-off explanation"],
        support: "low"
      },
      {
        id: "i0-probability-toolkit",
        track: "Proofs and Algorithms",
        title: "Probability Toolkit",
        summary: "Random variables, expectation, Jensen's inequality, Markov chains, and asymptotic notation.",
        concepts: ["expectation", "Jensen inequality", "Markov chain", "asymptotics"],
        support: "medium"
      },
      {
        id: "i1-entropy-inequalities",
        track: "Proofs and Algorithms",
        title: "Entropy Inequalities",
        summary: "Prove non-negativity, conditioning reduces entropy, data processing, and Fano-style limits.",
        concepts: ["non-negativity", "conditioning", "data processing", "Fano inequality"],
        support: "medium"
      },
      {
        id: "i2-compression-algorithms",
        track: "Proofs and Algorithms",
        title: "Compression Algorithms",
        summary: "Compare Huffman, arithmetic coding, and Lempel-Ziv through their assumptions and limits.",
        concepts: ["Huffman", "arithmetic coding", "Lempel-Ziv", "universality"],
        support: "medium"
      },
      {
        id: "i3-channel-coding",
        track: "Proofs and Algorithms",
        title: "Channel Coding Theorem Intuition",
        summary: "Random codebooks, typical decoding, reliability below capacity, and failure above capacity.",
        concepts: ["random codebook", "typical decoding", "capacity threshold", "reliability"],
        support: "low"
      },
      {
        id: "i4-continuous-information",
        track: "Proofs and Algorithms",
        title: "Continuous Information",
        summary: "Differential entropy, Gaussian maximum entropy, AWGN capacity, and coordinate dependence.",
        concepts: ["differential entropy", "Gaussian maximum entropy", "AWGN", "coordinate dependence"],
        support: "low"
      },
      {
        id: "i5-variational-bounds",
        track: "Proofs and Algorithms",
        title: "Variational Bounds and Modern ML",
        summary: "ELBOs, cross-entropy, contrastive bounds, and why KL shows up in model training.",
        concepts: ["ELBO", "variational inference", "contrastive bound", "KL regularization"],
        support: "low"
      },
      {
        id: "i6-information-bottleneck",
        track: "Proofs and Algorithms",
        title: "Information Bottleneck",
        summary: "Compress X while preserving information about Y, then relate it to representation learning.",
        concepts: ["compression", "prediction target", "representation", "bottleneck trade-off"],
        support: "low"
      },
      {
        id: "i7-feedback-interaction",
        track: "Proofs and Algorithms",
        title: "Feedback and Interactive Information",
        summary: "Directed information, feedback channels, active learning, and adaptive experiments.",
        concepts: ["directed information", "feedback", "active learning", "adaptive experiment"],
        support: "low"
      },
      {
        id: "i8-research-capstone",
        track: "Proofs and Algorithms",
        title: "Intermediate Research Capstone",
        summary: "Read a paper, reconstruct its random variables, and reproduce one small calculation.",
        concepts: ["paper reconstruction", "random variables", "assumptions", "small calculation"],
        support: "low"
      },
      {
        id: "a0-reading-playbook",
        track: "Applied Labs",
        title: "Paper Reading Playbook",
        summary: "A repeatable method for reading Shannon-style papers without getting lost in symbols.",
        concepts: ["paper structure", "random variable tracking", "theorem meaning", "assumption audit"],
        support: "medium"
      },
      {
        id: "a1-compressor-project",
        track: "Applied Labs",
        title: "Project: Build a Tiny Compressor",
        summary: "Estimate a source distribution, design a code, measure overhead, and write a compression report.",
        concepts: ["source estimation", "code design", "overhead", "measurement"],
        support: "low"
      },
      {
        id: "a2-noisy-decoder",
        track: "Applied Labs",
        title: "Project: Noisy Channel Decoder",
        summary: "Choose redundancy, simulate noise, decode, and compare empirical error rates to capacity.",
        concepts: ["redundancy", "simulation", "decoder", "empirical error"],
        support: "low"
      },
      {
        id: "a3-leakage-audit",
        track: "Applied Labs",
        title: "Privacy and Leakage Audit",
        summary: "Use mutual information as a lens for feature leakage, de-anonymization, and side channels.",
        concepts: ["feature leakage", "de-anonymization", "side channel", "mutual information"],
        support: "low"
      },
      {
        id: "a4-representation-audit",
        track: "Applied Labs",
        title: "Representation Learning Audit",
        summary: "Inspect embeddings and bottlenecks with compression, sufficiency, and invariance questions.",
        concepts: ["embedding", "bottleneck", "sufficiency", "invariance"],
        support: "low"
      },
      {
        id: "a5-systems-case-study",
        track: "Applied Labs",
        title: "Communication Systems Case Study",
        summary: "Map a real system into source, encoder, channel, decoder, capacity, latency, and reliability.",
        concepts: ["source", "encoder", "channel", "decoder", "capacity", "latency", "reliability"],
        support: "low"
      },
      {
        id: "a6-final-project",
        track: "Applied Labs",
        title: "Final Project and Oral Exam",
        summary: "Produce a short report, defend the random variables, and explain the operational meaning.",
        concepts: ["report", "defense", "random variables", "operational meaning"],
        support: "low"
      }
    ]
  }
];
