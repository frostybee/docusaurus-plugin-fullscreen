---
title: Examples
description: See the docusaurus-plugin-fullscreen in action with various code examples and configurations.
---

# Examples

This page demonstrates the Docusaurus Code Block Fullscreen plugin in action with various code examples and configurations. Each code block below has a fullscreen button that you can click to see the fullscreen functionality.

## Basic Code Blocks

### JavaScript Example

```javascript title="hello-world.js"
// Try clicking the fullscreen button (⛶) above!
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to our documentation`;
}

// Usage example
const userName = "Developer";
const message = greetUser(userName);
console.log(message);

```

### Python Example

```python title="data_processor.py"
import pandas as pd
import numpy as np

class DataProcessor:
    def __init__(self, data_source):
        self.data_source = data_source
        self.processed_data = None
    
    def load_data(self):
        """Load data from the specified source."""
        try:
            self.data = pd.read_csv(self.data_source)
            print(f"Loaded {len(self.data)} records")
            return True
        except Exception as e:
            print(f"Error loading data: {e}")
            return False
    
    def process_data(self):
        """Process the loaded data."""
        if self.data is not None:
            # Remove duplicates
            self.processed_data = self.data.drop_duplicates()
            
            # Handle missing values
            self.processed_data = self.processed_data.fillna(0)
            
            # Normalize numerical columns
            numerical_cols = self.processed_data.select_dtypes(include=[np.number]).columns
            self.processed_data[numerical_cols] = (
                self.processed_data[numerical_cols] - self.processed_data[numerical_cols].mean()
            ) / self.processed_data[numerical_cols].std()
            
            return self.processed_data
        else:
            raise ValueError("No data loaded. Call load_data() first.")

# Usage
processor = DataProcessor("data.csv")
if processor.load_data():
    result = processor.process_data()
    print("Data processing completed successfully!")
```

### React Component Example

```jsx title="UserProfile.jsx"
import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button, Spinner } from '@/components/ui';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size="lg" />
        <span className="ml-2">Loading user profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <h3 className="text-red-800 font-semibold">Error Loading Profile</h3>
        <p className="text-red-600 mt-2">{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar 
          src={user.avatar} 
          alt={user.name}
          size="lg"
          fallback={user.name.charAt(0)}
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
            {user.status}
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <p className="text-gray-900 mt-1">{user.bio || 'No bio available'}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          <p className="text-gray-900 mt-1">{user.location || 'Not specified'}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700">Joined</label>
          <p className="text-gray-900 mt-1">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <Button 
          onClick={() => handleUpdateProfile({ ...user, lastActive: new Date() })}
          className="flex-1"
        >
          Update Profile
        </Button>
        <Button variant="outline" className="flex-1">
          Send Message
        </Button>
      </div>
    </Card>
  );
};

export default UserProfile;
```

## Frameless Code Blocks

These code blocks don't have titles but still get fullscreen buttons (when `addToFramelessBlocks` is enabled):

```bash
# Install dependencies
npm install docusaurus-plugin-fullscreen

# Start development server
npm start

# Build for production
npm run build
```

```sql
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(p.id) as post_count,
    MAX(p.created_at) as last_post_date
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE u.active = true
    AND u.created_at >= '2023-01-01'
GROUP BY u.id, u.name, u.email
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC, last_post_date DESC
LIMIT 50;
```

## Configuration Examples

### Basic Configuration

```js title="docusaurus.config.js"
module.exports = {
  title: 'My Documentation',
  tagline: 'Awesome docs with fullscreen code blocks',
  
  plugins: [
    'docusaurus-plugin-fullscreen',
  ],
  
  // ... rest of your config
};
```

### Advanced Configuration

```js title="docusaurus.config.js"
module.exports = {
  title: 'My Documentation',
  
  plugins: [
    [
      'docusaurus-plugin-fullscreen',
      {
        // Custom tooltip text
        fullscreenButtonTooltip: 'Expand to fullscreen view',
        
        // Enable escape key to exit fullscreen
        enableEscapeKey: true,
        
        // Enable browser back button to exit fullscreen
        exitOnBrowserBack: true,
        
        // Add buttons to all code blocks (including frameless)
        addToFramelessBlocks: true,
        
        // Set zoom level for fullscreen mode
        fullscreenZoomLevel: 120,
        
        // Animation duration in milliseconds
        animationDuration: 250,
        
        // Custom SVG paths for icons
        svgPathFullscreenOn: "M16 3h6v6h-2V5h-4V3zM2 3h6v2H4v4H2V3zm18 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z",
        svgPathFullscreenOff: "M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z",
      },
    ],
  ],
  
  // ... rest of your config
};
```

## Long Code Examples

These examples demonstrate how the fullscreen functionality is particularly useful for longer code blocks:

### Complex Algorithm Implementation

```python title="graph_algorithms.py"
from collections import defaultdict, deque
import heapq

class Graph:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
        self.vertices = set()
    
    def add_edge(self, u, v, weight=1):
        """Add an edge between vertices u and v with optional weight."""
        self.graph[u].append((v, weight))
        self.vertices.add(u)
        self.vertices.add(v)
        
        if not self.directed:
            self.graph[v].append((u, weight))
    
    def bfs(self, start):
        """Breadth-First Search traversal."""
        visited = set()
        queue = deque([start])
        result = []
        
        while queue:
            vertex = queue.popleft()
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                
                # Add unvisited neighbors to queue
                for neighbor, _ in self.graph[vertex]:
                    if neighbor not in visited:
                        queue.append(neighbor)
        
        return result
    
    def dfs(self, start, visited=None):
        """Depth-First Search traversal (recursive)."""
        if visited is None:
            visited = set()
        
        visited.add(start)
        result = [start]
        
        for neighbor, _ in self.graph[start]:
            if neighbor not in visited:
                result.extend(self.dfs(neighbor, visited))
        
        return result
    
    def dijkstra(self, start):
        """Find shortest paths from start vertex to all other vertices."""
        distances = {vertex: float('infinity') for vertex in self.vertices}
        distances[start] = 0
        previous = {}
        
        # Priority queue: (distance, vertex)
        pq = [(0, start)]
        visited = set()
        
        while pq:
            current_distance, current_vertex = heapq.heappop(pq)
            
            if current_vertex in visited:
                continue
                
            visited.add(current_vertex)
            
            # Check neighbors
            for neighbor, weight in self.graph[current_vertex]:
                distance = current_distance + weight
                
                # If we found a shorter path, update it
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    previous[neighbor] = current_vertex
                    heapq.heappush(pq, (distance, neighbor))
        
        return distances, previous
    
    def get_shortest_path(self, start, end):
        """Get the shortest path between start and end vertices."""
        distances, previous = self.dijkstra(start)
        
        if distances[end] == float('infinity'):
            return None  # No path exists
        
        # Reconstruct path
        path = []
        current = end
        
        while current is not None:
            path.append(current)
            current = previous.get(current)
        
        path.reverse()
        return path, distances[end]
    
    def detect_cycle(self):
        """Detect if the graph contains a cycle."""
        if not self.directed:
            return self._detect_cycle_undirected()
        else:
            return self._detect_cycle_directed()
    
    def _detect_cycle_undirected(self):
        """Detect cycle in undirected graph using DFS."""
        visited = set()
        
        def dfs_cycle(vertex, parent):
            visited.add(vertex)
            
            for neighbor, _ in self.graph[vertex]:
                if neighbor not in visited:
                    if dfs_cycle(neighbor, vertex):
                        return True
                elif neighbor != parent:
                    return True
            
            return False
        
        for vertex in self.vertices:
            if vertex not in visited:
                if dfs_cycle(vertex, None):
                    return True
        
        return False
    
    def _detect_cycle_directed(self):
        """Detect cycle in directed graph using DFS with colors."""
        WHITE, GRAY, BLACK = 0, 1, 2
        colors = {vertex: WHITE for vertex in self.vertices}
        
        def dfs_cycle(vertex):
            colors[vertex] = GRAY
            
            for neighbor, _ in self.graph[vertex]:
                if colors[neighbor] == GRAY:
                    return True  # Back edge found
                elif colors[neighbor] == WHITE and dfs_cycle(neighbor):
                    return True
            
            colors[vertex] = BLACK
            return False
        
        for vertex in self.vertices:
            if colors[vertex] == WHITE:
                if dfs_cycle(vertex):
                    return True
        
        return False
    
    def topological_sort(self):
        """Perform topological sort on directed acyclic graph."""
        if not self.directed:
            raise ValueError("Topological sort only works on directed graphs")
        
        if self.detect_cycle():
            raise ValueError("Cannot perform topological sort on graph with cycles")
        
        in_degree = {vertex: 0 for vertex in self.vertices}
        
        # Calculate in-degrees
        for vertex in self.vertices:
            for neighbor, _ in self.graph[vertex]:
                in_degree[neighbor] += 1
        
        # Find vertices with no incoming edges
        queue = deque([vertex for vertex in self.vertices if in_degree[vertex] == 0])
        result = []
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            # Remove this vertex from graph
            for neighbor, _ in self.graph[vertex]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        return result

# Example usage
if __name__ == "__main__":
    # Create a directed graph
    g = Graph(directed=True)
    
    # Add edges
    edges = [
        ('A', 'B', 4), ('A', 'C', 2),
        ('B', 'C', 1), ('B', 'D', 5),
        ('C', 'D', 8), ('C', 'E', 10),
        ('D', 'E', 2)
    ]
    
    for u, v, w in edges:
        g.add_edge(u, v, w)
    
    # Perform various operations
    print("BFS from A:", g.bfs('A'))
    print("DFS from A:", g.dfs('A'))
    
    distances, _ = g.dijkstra('A')
    print("Shortest distances from A:", distances)
    
    path, distance = g.get_shortest_path('A', 'E')
    print(f"Shortest path from A to E: {path} (distance: {distance})")
    
    print("Has cycle:", g.detect_cycle())
    print("Topological sort:", g.topological_sort())
```

## Interactive Features

### Keyboard Navigation Demo

Try using your keyboard to navigate between the code blocks on this page:

1. **Tab through code blocks**: Press `Tab` to move focus between different code blocks
2. **Enter fullscreen**: When a code block is focused, press `Enter` to activate fullscreen mode
3. **Exit fullscreen**: Press `Escape` to exit fullscreen mode
4. **Browser back**: Use your browser's back button to exit fullscreen

### Multiple Code Blocks

Here are several smaller code blocks to practice keyboard navigation:

```javascript
console.log("First code block");
```

```python
print("Second code block")
```

```bash
echo "Third code block"
```

```css
.fourth-code-block {
  color: blue;
}
```

```json
{
  "message": "Fifth code block",
  "type": "JSON"
}
```

## Testing Different Languages

The plugin works with all programming languages supported by Docusaurus:

### Rust

```rust title="fibonacci.rs"
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    for i in 0..10 {
        println!("fibonacci({}) = {}", i, fibonacci(i));
    }
}
```

### Go

```go title="server.go"
package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World! Time: %s", time.Now().Format(time.RFC3339))
}

func main() {
    http.HandleFunc("/", handler)
    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### TypeScript

```typescript title="api-client.ts"
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json',
      ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
    };
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.headers,
      });

      const data = await response.json();
      
      return {
        data,
        status: response.ok ? 'success' : 'error',
        message: response.ok ? undefined : data.message,
      };
    } catch (error) {
      return {
        data: null as T,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      return {
        data,
        status: response.ok ? 'success' : 'error',
        message: response.ok ? undefined : data.message,
      };
    } catch (error) {
      return {
        data: null as T,
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Usage example
const client = new ApiClient('https://api.example.com', 'your-api-key');

async function fetchUsers(): Promise<User[]> {
  const response = await client.get<User[]>('/users');
  
  if (response.status === 'success') {
    return response.data;
  } else {
    throw new Error(response.message || 'Failed to fetch users');
  }
}
```

## Tips for Using Fullscreen Mode

1. **Large Code Blocks**: Fullscreen mode is especially useful for longer code examples that don't fit well in the normal page layout.

2. **Code Review**: Use fullscreen mode when you need to carefully examine code details without distractions.

3. **Mobile Viewing**: On mobile devices, fullscreen mode provides a much better reading experience for code.

4. **Presentations**: When presenting or sharing your screen, fullscreen code blocks are easier for audiences to read.

5. **Accessibility**: Users with visual impairments can benefit from the increased zoom level in fullscreen mode.

Try clicking the fullscreen button on any of the code blocks above to experience the enhanced viewing mode! 