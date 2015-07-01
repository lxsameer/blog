---
title: Serving multiple sites via same Rails application
layout: post
date: 2015-06-20 14:02
categories: ElasticSearch
tags: ElasticSearch
author: lxsameer
description: Serving multiple sites via same Rails application
---
If you're a [Django](https://www.djangoproject.com/) developer you probably know about its wonderful [sites framework](https://docs.djangoproject.com/en/1.8/ref/contrib/sites/).

>Django comes with an optional “sites” framework. It’s a hook for associating objects and functionality to particular Web sites, and it’s a holding place for the domain names and “verbose” names of your Django-powered sites.
>
>Use it if your single Django installation powers more than one site and you need to differentiate between those sites in some way.

Using Sites framework of **Djangoo** your can serve different websites with different contents via a single installation
of your Django application.

As an Ex-pythonist I really loved this feature and used it a lot. After moving to [Ruby](http://ruby-lang.org) and
[RubyOnRails](http://rubyonrails.org/) I found out that there was a hole in Rails world for this feature.Ofcourse there
are [Constraints](http://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper/Scoping.html#method-i-constraints), but still
there weren't any complete and integrate solution.

Since we needed a feature like **Django**'s sites framework in one of our projects in our team. I pulled my self together and
decided to build one. After spending to much time and prototyping lots of solution I finally came up with **[SiteFramework](https://rubygems.org/gems/site_framework/versions/1.0.2)** gem.

[SiteFramework](https://rubygems.org/gems/site_framework/versions/1.0.2) is a Rails engine that provides some helpers and models which
allows you to simply categorize your routes for different sites and serve your contents based on the current site, user is visiting.

I'm going to give you an introduction to [SiteFramework](https://rubygems.org/gems/site_framework/versions/1.0.2) and how to use it.
Fasten you seat belts folks.

## Installation
Add `site_framework` to your `Gemfile`:

```ruby
gem 'site_framework'
```

and after installing your project dependencies using `bundle install` command. Install
**SiteFramework** migrations like:

```bash
rake site_framework:install:migrations
```

That's it.

## Usage
