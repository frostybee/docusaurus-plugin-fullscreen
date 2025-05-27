---
title: Examples
description: See the docusaurus-plugin-fullscreen in action with various code examples and configurations.
sidebar_position: 2
---

## Examples

This page demonstrates the Docusaurus Code Block Fullscreen plugin in action with various code examples and configurations. Each code block below has a fullscreen button that you can click to see the fullscreen functionality.

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

## Long Code Examples

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
