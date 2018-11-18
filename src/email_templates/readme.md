# Email Templates

An introduction to writing sweet email templates powered by Banana. 

## So why HTML tables … 
To explain why we used HTML tables we have to understand the platform that we’re writing HTML/CSS for, which is email. 

The state of writing email templates is all over the place, akin to browser standards in the early 2000s. There are limited cross-email standards, so it’s kind of the wild west when it comes to writing out these templates. 

However, most of the major email clients such as Gmail, Outlook and Spark among others have amazing support to rendering tables as well as writing css styles within the HTML file. 

For that reason we went forward with creating our email templates with tables. But don’t worry we did all the heavy lifting so that you wouldn’t need to. 

## So what do I do if I want to add my own styles or additional fields? 

Unfortunately, to change styles across emails at the moment you would need to go to every .handlebars file to change and test the html accordingly. 

With that said there is hope, if you want minimal changes such as the background color or the logo image or the hackathon name, there’s a sweet config file where you can set all of the above to get those changes for every template. 

## The config file
You can find this file in `src/config/index.js`
So this is what the config file looks like. 

```javascript
config = {
  backgroundColor: '',
  hackathonName: '',
  logoPath: '',
  email: '',
  mangoUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  instagramUrl: '',
}
```

This where you set all of your config variables for the email templates. For example, mangoUrl is set for whatever url your frontend (Powered by the sweet front end client mango) is. 

## Inline styling

Another email standard includes adding inline css styles and not have them be separate to the file or even additional as a `<style>` element

To create handlebar files with inline css simply add your css to the file's respective `<style>` block and then use a website like https://inliner.cm/ to convert the html to html with inline css

the file `default.handlebars` contains unchanged html and css templating without adding the inline css. 