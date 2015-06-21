---
title: ElasticSearch & 'Group By'
layout: post
date: 2015-06-20 14:02
categories: ElasticSearch
tags: ElasticSearch
author: lxsameer
description: ElasticSearch & 'Group By'
---
[ElasticSearch](https://www.elastic.co/) is the best Opensource search engine out there in the wild in my opinion. If
your not familiar with it, I highly recommend you to checkout [this awesome tutorial](http://joelabrahamsson.com/elasticsearch-101/)
and get start with [ElasticSearch](https://www.elastic.co/).

while ago we did an episode on [ElasticSearch](https://www.elastic.co/) in [Radio Boot](http://www.radioboot.com/episodes/2/).
After that people came to me and ask different questions about [ElasticSearch](https://www.elastic.co/). There was a question
which I got frequently. **"How can I group my result by an specific field value?"**

I saw many people searching for a **Group by** functionality in [ElasticSearch](https://www.elastic.co/). So I decided to write
a blog post on this feature.

[ElasticSearch](https://www.elastic.co/) comes with a very handy and awesome module which is called [Aggregations Modul](https://www.elastic.co/guide/en/elasticsearch/reference/1.3/search-aggregations.html#search-aggregations). This module have lots of different
use cases but we want to use this one for simulate a **group by** functionality.

So Let's use the same indices from the given tutorial. I try keep this post as short as possible, So hear is what should we do:

```json
{
    "query": {
        "match_all": {}
    },
    "aggs": {
        "genres": {
            "terms": {
                "field": "genres"

            },

            "aggs": {
                "genres": {
                    "top_hits": {
                        "_source": {
                            "include": [
                                "title",
                                "year"
                            ]
                        },
                        "size": 100
                    }
                }
            }
        }
    }
}
```

As you may already know you have to **POST** the above json to your elastic search via `http://<host>:9200/_search`.
and you gonna get:

```json
{
...
    "aggregations": {
        "genres": {
            "doc_count_error_upper_bound": 0,
            "sum_other_doc_count": 0,
            "buckets": [
                {
                    "key": "drama",
                    "doc_count": 5,
                    "genres": {
                        "hits": {
                            "total": 5,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "4",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Apocalypse Now",
                                        "year": 1979
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "1",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Godfather",
                                        "year": 1972
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "6",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Assassination of Jesse James by the Coward Robert Ford",
                                        "year": 2007
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "2",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Lawrence of Arabia",
                                        "year": 1962
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "3",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Godfather",
                                        "year": 1972
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "key": "crime",
                    "doc_count": 4,
                    "genres": {
                        "hits": {
                            "total": 4,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "5",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Kill Bill: Vol. 1",
                                        "year": 2003
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "1",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Godfather",
                                        "year": 1972
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "6",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Assassination of Jesse James by the Coward Robert Ford",
                                        "year": 2007
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "3",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Godfather",
                                        "year": 1972
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "key": "biography",
                    "doc_count": 2,
                    "genres": {
                        "hits": {
                            "total": 2,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "6",
                                    "_score": 1,
                                    "_source": {
                                        "title": "The Assassination of Jesse James by the Coward Robert Ford",
                                        "year": 2007
                                    }
                                },
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "2",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Lawrence of Arabia",
                                        "year": 1962
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "key": "action",
                    "doc_count": 1,
                    "genres": {
                        "hits": {
                            "total": 1,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "5",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Kill Bill: Vol. 1",
                                        "year": 2003
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "key": "adventure",
                    "doc_count": 1,
                    "genres": {
                        "hits": {
                            "total": 1,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "2",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Lawrence of Arabia",
                                        "year": 1962
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "key": "thriller",
                    "doc_count": 1,
                    "genres": {
                        "hits": {
                            "total": 1,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "5",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Kill Bill: Vol. 1",
                                        "year": 2003
                                    }
                                }
                            ]
                        }
                    }
                },
                {
                    "key": "war",
                    "doc_count": 1,
                    "genres": {
                        "hits": {
                            "total": 1,
                            "max_score": 1,
                            "hits": [
                                {
                                    "_index": "movies",
                                    "_type": "movie",
                                    "_id": "4",
                                    "_score": 1,
                                    "_source": {
                                        "title": "Apocalypse Now",
                                        "year": 1979
                                    }
                                }
                            ]
                        }
                    }
                }
            ]
        }
    }
...
}
```

I partially pasted the result. Ok let's break down the query.

Here is the basic template for creating an aggregation in elastic search:

```json
"aggregations": {
    "<aggregation_name>": {
        "<aggregation_type>": {
            <aggregation_body>
        }
        [,"aggregations": { [<sub_aggregation>]+ } ]?
    }
    [,"<aggregation_name_2>": { ... } ]*
}
```

So you can see that we simply defined an aggregation called `genres` which aggregate the result based on
`genres` field of indices. Using `top_hits` and `include` we extends our result to contains `title` and `year`
fields of each matching index.

I tried to write a short post (yeah, you wish), but if you need to know the details, please take a look at
(Aggregations)[https://www.elastic.co/guide/en/elasticsearch/reference/1.3/search-aggregations.html] in official
guide of ElasticSearch.
