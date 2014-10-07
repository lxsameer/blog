---
layout: post
title: Mobile Apps & pre-populated databases
date: 2014-9-24  22:41
categories: MobileDev
tags: Susanoo Cordova Phonegap
author: lxsameer
description: Mobile app development and re-populated databases challenge
---

In the past couple of weeks I was working on Mobile application which was a math related game. As always
I used our beloved [Susanoo](http://github.com/Yellowen/Susanoo) framework for the task which use
[Apache Cordova](http://cordova.apache.org/) internally.

But I experienced a problem. The Game had a database with 38,000 records. If you have never developed a
mobile application, it may seem odd to you because 38,000 records is not that big a deal. Unfortunately
This number is kind of a big deal for a mobile application. Because the application may run on different
types of devices with different type of hardware. Long story short **It's a big deal**.

To face this problem I had these choices:

* SQLite
* WebSQL or IndexedDB
* Single JSON (or any other format) file
* Multiple JSON file

Using **SQLite** and a native **Android** driver a single SQL `SELECT` query to retrieve a single row
took about 18 seconds on a quad core device (Sony Xperia Z). It was a **disaster**.

**WebSQL** and **IndexedDB** were out of the picture too. Because spending a lot of time on putting
data from a pre-populated data storage like `JSON` file into these databases took bout 30 minutes on
the same device. No one likes to wait for 30 minutes for a simple math game.

I had better performance with a single `JSON` file on my device. It was a bit slow but eeeh. But when
it comes to install the game on a single core device. **Ka-BOOOOOOOM** Slower devices couldn't even load the file.

So I tried my last resort. I broke the single `JSON` file into smaller piece. The original file was about 10Mb
and I tried different combination of broke down. For example, I broke the file into 38,000 pieces based on
row IDs or I broke the file into about 300 files based on game levels and so on. The problem with this
approach was the **SIZE**. Total size of 38,000 records gets about 150Mb. Who want to download a 160Mb
math game?

You probably are waiting for me to introduce you to the solution, don't you?

Ok Here is what have I done. I simply created a binary database by serializing my data into a series of
bytes and separate records using one byte separator. here is a part of my data:

{% highlight python linenos %}
"""
00 0c 0f 05 08 64 0b 09 02 64 09 06 03 65 00 0a
06 0e 0a 64 0c 04 08 64 08 02 06 65 00 05 06 0c
0d 64 09 01 08 64 09 05 04 65 00 0e 0a 0f 0b 64
0d 06 07 64 0c 04 08 65 00 0d 0a 0e 0b 64 0f 07
08 64 09 03 06 65 00 0e 0c 0b 09 64 0f 09 06 64
08 03 05 65 00 07 09 05 07 64 06 04 02 64 08 05
03 65 00 06 07 08 09 64 0a 04 06 64 05 03 02 65
00 06 0d 05 0c 64 07 04 03 64 0b 09 02 65 00 0b
0e 04 07 64 09 08 01 64 09 06 03 65 00 0a 0b 0b
0c 64 11 08 09 64 05 03 02 65 00 0e 0a 0b 07 64
"""
{% endhighlight %}

As you can see (probably) I separate my records using `65` (`e` in `ASCII`). And `64`
to separate my fields (Since my data in just some numbers, it wasn't a problem to use
separators in alphabet range). With this approach my data shrank to only 350Kb which was
much smaller. Long story short, I parsed my data in javascript like this:

{% highlight javascript linenos %}
        this.parse_bytes = function(data) {
        var result = {};

        // Parse the first byte as the level field
        result.level = data.charCodeAt(0);

        var parts = data.slice(1).split('d');

        var rows = [];

        _.each(parts, function(x) {
            var row = [];
            // Loop through the bytes of a field to create its value
            // which is an array.
            for(var i = 0; i < x.length; i++) {
                row.push(x.charCodeAt(i));
            }

            rows.push(row);
        });

        result.first_row = rows.shift();
        result.rest_of_rows = rows;

        return result;
    };
{% endhighlight %}

As you see the above code is not even a **well written** Javascript code and it can
be re-factored to be more efficient, but using the above snippet it took only **0.3ms**
to load the entire database and fire a query in the same device. It's big isn't it.

If your data is bigger than mine or you have a very complex structure the only thing
you can do is, to use **WebServices**.

I hope this was helpful. :)
