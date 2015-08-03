---
title: Serving multiple sites via same Rails application
layout: post
date: 2015-06-20 14:02
categories: Ruby Rails
tags: site_framework
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

```
rake site_framework:install:migrations
```
That's it.

## Usage
**SiteFramework** provides to solution to multi-site support.

In both solution you have to add a migration for your tables and
make them domain aware (ActiveRecord Only). e.g in your migration:

```ruby
# Make posts table domain aware
domain_aware(:posts)
```

If you're using **Mongoid** just add a reference to **SiteFramework::Domain** in your model.

When a request arrives to the Rails application `SiteFramework` will add three different
methods to `Rails.application`.

* **domain**: An instance of `SiteFramework::Domain` model which refer to current domain of
the request
* **domain_name**: Current domain as string.
* **Site**: An instance of `SiteFramework::Site` model which refer to current site.


### A) Rack middleware:
Simply add `SiteFramework::Middleware` to your middleware stack.

### B) Constrants
Just use `sites` DSL in your `routes.rb`. e.g:

```ruby
Rails.application.routes.draw do

  # Share routes
  get 'home/index'

  # All the routes defined in this section will be domain aware.
  sites(self) do
    root 'home#index'
  end

  default_site(self) do
    # routs for default site
  end
end
```
Note: You can provide default domains for **SiteFramework** via an
initializer like this:

```ruby
SiteFramework.setup do |config|

  config.default_domains = ['localhost', 'example.com']

end
```

**Personally I prefer this (B) option since it's more Railish.**

### Model Concern
**SiteFramework** provides an **ActiveSupport** concern which transparently
makes your models aware of the current **Site** and **Domain**. By includeing
`SiteFramework::DomainAware` into your model, default scope of your model will
change to return only records which belongs to current **Site**.

This way you can use external gems with your multi-site application easily.
All you have to do is to open there models and include the given concern.

Piece of cake. right?

## Models

**SiteFramework** comes with a sets of models to help you build you application
easily.

* **Domain**: This model stores all the models that should be serviced via the
              application.
	      
* **Site**:   Holds each site instance configuration.

This is really streight forward. To check out the fields of these two model take
a look at the migrations that are copied into you main application.

Have fun. :)