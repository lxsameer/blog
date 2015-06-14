# place this file in your plugins directory and add the tag to your sidebar
# $ cat source/_includes/custom/asides/categories.html
#<section>
#  <h1>Categories</h1>
#  <ul id="categories">
#    {% category_list %}
#  </ul>
#</section>

module Jekyll
  class CategoryListTag < Liquid::Tag
    def render(context)
      html = ""
      colors = ["black", "red", "blue", "orange", "purple", "teal", "green"]
      categories = context.registers[:site].categories.keys
      categories.sort.each do |category|
        posts_in_category = context.registers[:site].categories[category].size
        # <a href="#" class="item"><div class="ui purple circular label">34</div> {{ cat[0] }}</a>

        html << "<div class='item'><a href='/categories/#{category}/'><div class='ui small #{colors.sample} image label'>#{category.capitalize}<div class='detail'>#{posts_in_category}</div></div></a></div>\n"
      end
      html
    end
  end
end

Liquid::Template.register_tag('category_list', Jekyll::CategoryListTag)
