# Introduction
Welcome to MyReusable, an open-source codes designed to save developers time by providing reusable hooks, components, and utilities. The primary goal of this project is to minimize bundle size and dependencies in your projects while providing a foundation that can be easily customized to meet your specific needs. Think of it as a toolkit – a set of raw, copy-friendly code snippets that empower you to tailor the functionality to your project requirements.

Feel free to explore, copy, and adapt the code snippets from MyReusable to enhance your development workflow. This project is here to save you time and offer flexibility in building applications. Happy coding!

## -) ADDITIONAL TIPS & TRICK

### Card List Layout (prevent last line growing)
```
      <ul className="flex flex-wrap justify-center gap-8 lg:after:content-[''] lg:after:flex-[1_0_31%]">
      <li className="shadow-lg flex-[1_0_48%] lg:flex-[1_0_31%]">Card</li>
      </ul>
```

One issue arises when you have three or more columns with two empty spaces: the last child will start growing. If you truly need to prevent this, you may want to consider referring to the layout used by YouTube. Here's a summary of the YouTube list layout:

(li) has a style width of calc(100% / var(--items-per-row) - var(--item-margin) - .01px).

(ul) has a style width of 100% with a flex.

This layout might offer a solution to your problem.

### Implement Input Number 
```
                    <Input
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onChange={(e) => {
                        field.onChange(e.target.value.replace(/\D/, ""));
                      }}
                    />
```
The issue with this approach is that the user can still use the "paste" to enter string values. This can be avoided by using zod as follows:
```
phone_number: z
    .union([z.string(), z.number()])
    .default("")
    .refine((val) => /^[1-9]\d*$/.test(String(val)), {
      message: "*Should be a valid number",
    }),
```
