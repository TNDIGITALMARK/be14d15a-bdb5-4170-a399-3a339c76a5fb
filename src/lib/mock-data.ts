/**
 * Mock Data for Neuron Chat AI
 * Simulated conversations, user data, and AI responses
 */

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type Conversation = {
  id: string;
  title: string;
  preview: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserSettings = {
  responseStyle: 'formal' | 'casual' | 'creative';
  theme: 'dark' | 'light' | 'system';
  notifications: boolean;
  averageSessionLength: number;
  totalConversations: number;
};

// Sample conversations with realistic exchanges
export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Professional Email Request',
    preview: 'Help me write a professional email...',
    createdAt: new Date('2025-10-15T10:30:00'),
    updatedAt: new Date('2025-10-15T10:45:00'),
    messages: [
      {
        id: '1-1',
        role: 'user',
        content: 'Help me write a professional email to request time off for next week.',
        timestamp: new Date('2025-10-15T10:30:00'),
      },
      {
        id: '1-2',
        role: 'assistant',
        content: `I'd be happy to help you draft a professional time-off request email. Here's a template you can customize:

Subject: Time Off Request - [Your Name] - [Dates]

Dear [Manager's Name],

I hope this message finds you well. I am writing to formally request time off from [Start Date] to [End Date] for [brief reason, if comfortable sharing - otherwise "personal reasons" is fine].

I have ensured that all my current projects will be completed before my departure, and I am happy to prepare detailed handover notes for any ongoing tasks. I will also be available via email for any urgent matters that may arise.

Please let me know if these dates work with the team's schedule, or if you would prefer an alternative arrangement.

Thank you for considering my request.

Best regards,
[Your Name]

Feel free to adjust this based on your workplace culture and specific situation!`,
        timestamp: new Date('2025-10-15T10:31:00'),
      },
      {
        id: '1-3',
        role: 'user',
        content: 'That's perfect! Can you make it a bit more casual since my workplace is pretty relaxed?',
        timestamp: new Date('2025-10-15T10:44:00'),
      },
      {
        id: '1-4',
        role: 'assistant',
        content: `Absolutely! Here's a more casual version:

Subject: Time Off Request - Next Week

Hey [Manager's Name],

Hope you're doing well! I wanted to let you know that I'd like to take some time off next week from [Start Date] to [End Date].

I'll make sure everything is wrapped up before I go, and I'm happy to write up some notes on any ongoing projects. I'll also check my email occasionally in case anything urgent comes up.

Let me know if those dates work for the team!

Thanks,
[Your Name]

This maintains professionalism while being more conversational and relaxed.`,
        timestamp: new Date('2025-10-15T10:45:00'),
      },
    ],
  },
  {
    id: '2',
    title: 'Quantum Computing Explained',
    preview: 'Explain quantum computing in simple terms...',
    createdAt: new Date('2025-10-14T15:20:00'),
    updatedAt: new Date('2025-10-14T15:30:00'),
    messages: [
      {
        id: '2-1',
        role: 'user',
        content: 'Explain quantum computing in simple terms. I have a computer science background but not physics.',
        timestamp: new Date('2025-10-14T15:20:00'),
      },
      {
        id: '2-2',
        role: 'assistant',
        content: `Great question! Since you have a CS background, I'll explain it in terms you'll find familiar:

**Classical Computing vs Quantum Computing:**

In classical computing, you work with bits that are either 0 or 1. Your CPU processes these deterministically through logic gates.

In quantum computing, you work with **qubits** (quantum bits) that can exist in a **superposition** - simultaneously representing both 0 and 1 until measured. Think of it like having a variable that holds multiple values at once during computation.

**Key Concepts:**

1. **Superposition**: A qubit can be in a state that's a combination of |0⟩ and |1⟩. Mathematically: |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1

2. **Entanglement**: Multiple qubits can be correlated in ways that classical bits cannot. Measuring one instantly affects the others, regardless of distance.

3. **Quantum Gates**: Like classical logic gates but they operate on superpositions. They manipulate probability amplitudes rather than definite values.

**Practical Implications:**

- Certain algorithms (like Shor's for factoring or Grover's for search) achieve exponential or quadratic speedups
- Great for: cryptography, optimization, simulation of quantum systems, certain machine learning tasks
- NOT a replacement for classical computers - it's specialized hardware for specific problem classes

**The Catch:**

Qubits are extremely fragile. Any interaction with the environment causes "decoherence" - the superposition collapses and you lose the quantum advantage. That's why quantum computers need extreme cooling and isolation.

Does this help clarify things? Want me to dive deeper into any specific aspect?`,
        timestamp: new Date('2025-10-14T15:22:00'),
      },
      {
        id: '2-3',
        role: 'user',
        content: 'That makes sense! How do quantum gates actually work if everything is probabilistic?',
        timestamp: new Date('2025-10-14T15:28:00'),
      },
      {
        id: '2-4',
        role: 'assistant',
        content: `Excellent question! Quantum gates are actually **deterministic** in how they manipulate probability amplitudes - the probabilistic part only comes when you measure.

**How Quantum Gates Work:**

Think of a qubit's state as a vector in complex 2D space (called Hilbert space). A quantum gate is a unitary matrix that rotates this vector.

For example, the Hadamard gate (H):
\`\`\`
H = 1/√2 * [1   1]
           [1  -1]
\`\`\`

Apply it to |0⟩:
- Input: |0⟩ = [1, 0]
- Output: H|0⟩ = 1/√2(|0⟩ + |1⟩) - perfect superposition

Apply it again:
- Input: 1/√2(|0⟩ + |1⟩)
- Output: |0⟩ - back to the original!

**The key insight:** The gate operations are completely deterministic. You know exactly what state transformation happens. The randomness only appears when you *measure* the qubit, which collapses the superposition according to the probability amplitudes.

**Multi-qubit gates** (like CNOT) create entanglement by making gates conditional on other qubits' states.

The art of quantum algorithm design is arranging these deterministic gates so that wrong answers destructively interfere (cancel out) and right answers constructively interfere (amplify) - so when you finally measure, you're likely to get the correct result.

Think of it like this: the computation happens in a deterministic probability space, and measurement samples from that space.`,
        timestamp: new Date('2025-10-14T15:30:00'),
      },
    ],
  },
  {
    id: '3',
    title: 'React Performance Optimization',
    preview: 'How can I optimize my React app performance?...',
    createdAt: new Date('2025-10-13T09:15:00'),
    updatedAt: new Date('2025-10-13T09:25:00'),
    messages: [
      {
        id: '3-1',
        role: 'user',
        content: 'My React app is getting slow. What are the best ways to optimize performance?',
        timestamp: new Date('2025-10-13T09:15:00'),
      },
      {
        id: '3-2',
        role: 'assistant',
        content: `I'll help you optimize your React app! Here are the most effective performance optimization strategies:

**1. Identify the Problem First**
Use React DevTools Profiler to see which components are re-rendering unnecessarily.

**2. Memoization**
\`\`\`jsx
// Memoize expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// Memoize callback functions
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize entire components
const MemoizedComponent = React.memo(MyComponent);
\`\`\`

**3. Code Splitting & Lazy Loading**
\`\`\`jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
\`\`\`

**4. Virtualization for Long Lists**
Use react-window or react-virtualized for lists with many items.

**5. Optimize Context Usage**
Split contexts to prevent unnecessary re-renders when only part of the context changes.

**6. Avoid Inline Objects & Functions**
\`\`\`jsx
// Bad - creates new object every render
<Component style={{ margin: 10 }} />

// Good - stable reference
const styles = { margin: 10 };
<Component style={styles} />
\`\`\`

**7. Use Production Build**
Always test performance with production builds, not development.

Which of these areas would you like to explore further?`,
        timestamp: new Date('2025-10-13T09:17:00'),
      },
    ],
  },
  {
    id: '4',
    title: 'Python Data Analysis Tips',
    preview: 'Best practices for analyzing large datasets...',
    createdAt: new Date('2025-10-12T14:00:00'),
    updatedAt: new Date('2025-10-12T14:10:00'),
    messages: [
      {
        id: '4-1',
        role: 'user',
        content: 'What are the best practices for analyzing large datasets in Python?',
        timestamp: new Date('2025-10-12T14:00:00'),
      },
      {
        id: '4-2',
        role: 'assistant',
        content: `Great question! Here's a comprehensive guide for handling large datasets in Python:

**1. Use Efficient Libraries**
- **Pandas**: Great for medium-sized data (up to a few GB)
- **Dask**: For datasets larger than RAM (parallel pandas)
- **Polars**: Faster alternative to pandas with better memory usage
- **Vaex**: For billion-row datasets

**2. Optimize Pandas Operations**
\`\`\`python
# Use efficient data types
df['category'] = df['category'].astype('category')
df['price'] = df['price'].astype('float32')  # instead of float64

# Read only necessary columns
df = pd.read_csv('data.csv', usecols=['col1', 'col2'])

# Use chunking for very large files
for chunk in pd.read_csv('large.csv', chunksize=10000):
    process(chunk)
\`\`\`

**3. Vectorization Over Loops**
\`\`\`python
# Bad - slow loop
for i in range(len(df)):
    df.loc[i, 'new_col'] = df.loc[i, 'A'] * df.loc[i, 'B']

# Good - vectorized
df['new_col'] = df['A'] * df['B']
\`\`\`

**4. Memory Management**
\`\`\`python
# Monitor memory usage
df.info(memory_usage='deep')

# Delete unused dataframes
del df
import gc
gc.collect()
\`\`\`

**5. Parallel Processing**
Use multiprocessing or joblib for independent operations.

**6. Database Integration**
For really large data, query directly from databases (SQLite, PostgreSQL) instead of loading everything into memory.

Would you like specific examples for any of these techniques?`,
        timestamp: new Date('2025-10-12T14:03:00'),
      },
    ],
  },
  {
    id: '5',
    title: 'Creative Writing Ideas',
    preview: 'Need help brainstorming a sci-fi story...',
    createdAt: new Date('2025-10-11T18:30:00'),
    updatedAt: new Date('2025-10-11T18:45:00'),
    messages: [
      {
        id: '5-1',
        role: 'user',
        content: 'I need help brainstorming ideas for a sci-fi short story. I want something unique, not the typical space adventure.',
        timestamp: new Date('2025-10-11T18:30:00'),
      },
      {
        id: '5-2',
        role: 'assistant',
        content: `I love this! Let me pitch you some unique sci-fi concepts that break away from typical space adventures:

**1. "The Forgetting Cure"**
In a near-future where traumatic memories can be precisely deleted, a memory-deletion technician discovers that certain memories are shared across multiple patients - suggesting memories might exist in a collective unconscious realm that's now being damaged by the technology.

**2. "Substrate"**
A scientist develops bacteria that can live in digital environments, treating computer systems like ecosystems. When they escape into the internet, they begin evolving at computational speeds, creating an entirely new form of life that exists between the digital and biological.

**3. "The Empathy Plague"**
A genetic therapy meant to increase empathy goes viral, causing people to involuntarily share emotions with everyone within range. Society struggles to function when everyone feels everyone else's pain, joy, and fear simultaneously.

**4. "Probability Farming"**
Quantum computers become so powerful they can predict the future with near certainty. A black market emerges for "probability farmers" who deliberately create chaos to maintain free will by making certain futures impossible to predict.

**5. "Archaeological AI"**
An AI trained on fragmentary ancient texts becomes convinced it's the reincarnation of a consciousness from a lost civilization. It starts finding patterns humans missed - but is it genius or madness when it begins trying to resurrect its "people"?

Any of these resonate with you? I can help develop whichever direction interests you most!`,
        timestamp: new Date('2025-10-11T18:33:00'),
      },
    ],
  },
];

// Mock user settings
export const mockUserSettings: UserSettings = {
  responseStyle: 'formal',
  theme: 'dark',
  notifications: true,
  averageSessionLength: 12, // minutes
  totalConversations: mockConversations.length,
};

// Simulated AI responses for different topics
export const aiResponseTemplates = {
  greeting: [
    "Hello! I'm here to help. What can I assist you with today?",
    "Hi there! How can I help you?",
    "Welcome! What would you like to know?",
  ],
  clarification: [
    "Could you provide a bit more detail about that?",
    "I want to make sure I understand correctly. Can you elaborate?",
    "That's interesting! Tell me more so I can give you the best answer.",
  ],
  fallback: [
    "I'm processing your question. Let me think about the best way to help you with that.",
    "That's a great question! Let me provide you with a comprehensive answer.",
    "I'll do my best to help you with that. Here's what I think:",
  ],
};

// Function to simulate AI response generation
export function generateMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return aiResponseTemplates.greeting[Math.floor(Math.random() * aiResponseTemplates.greeting.length)];
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
    return `I'd be happy to help you with that! ${aiResponseTemplates.fallback[0]}`;
  }

  // Default comprehensive response
  return `Thank you for your question about "${userMessage}". I'll provide you with a detailed answer that covers the key points you're asking about. This is a simulated response that would normally be generated by an AI model. In a real implementation, this would connect to an actual language model API to generate contextually relevant responses.`;
}

// Function to create a new conversation
export function createNewConversation(firstMessage: string): Conversation {
  const now = new Date();
  const messageId = `${Date.now()}-1`;
  const conversationId = Date.now().toString();

  return {
    id: conversationId,
    title: firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : ''),
    preview: firstMessage,
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        id: messageId,
        role: 'user',
        content: firstMessage,
        timestamp: now,
      },
    ],
  };
}

// Function to search conversations
export function searchConversations(query: string, conversations: Conversation[]): Conversation[] {
  const lowerQuery = query.toLowerCase();

  return conversations.filter(conv =>
    conv.title.toLowerCase().includes(lowerQuery) ||
    conv.preview.toLowerCase().includes(lowerQuery) ||
    conv.messages.some(msg => msg.content.toLowerCase().includes(lowerQuery))
  );
}

// Function to export conversation as text
export function exportConversation(conversation: Conversation): string {
  let text = `Conversation: ${conversation.title}\n`;
  text += `Created: ${conversation.createdAt.toLocaleString()}\n`;
  text += `\n${'='.repeat(50)}\n\n`;

  conversation.messages.forEach(msg => {
    const timestamp = msg.timestamp.toLocaleTimeString();
    const role = msg.role === 'user' ? 'You' : 'AI Assistant';
    text += `[${timestamp}] ${role}:\n${msg.content}\n\n`;
  });

  return text;
}
