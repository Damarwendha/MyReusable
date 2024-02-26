# Introduction 
Welcome to MyReusable, an open-source codes designed to save developers time by providing reusable hooks, components, and utilities. The primary goal of this project is to minimize bundle size and dependencies in your projects while providing a foundation that can be easily customized to meet your specific needs. Think of it as a toolkit – a set of raw, copy-friendly code snippets that empower you to tailor the functionality to your project requirements.

Feel free to explore, copy, and adapt the code snippets from MyReusable to enhance your development workflow. This project is here to save you time and offer flexibility in building applications. Happy coding!

### Custom Input Number 
```
                      <Input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          const value = e.target.value.trim(); // Trim any leading/trailing spaces
                          // Check if the input is numeric
                          const numericValue = /^\d*$/.test(value)
                            ? Number(value)
                            : field.value;
                          field.onChange(numericValue);
                        }}
                      />
```
