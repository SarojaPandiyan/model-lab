from lxml import etree

xml = etree.parse("bookstore.xml")
xslt = etree.parse("bookstore.xsl")

transform = etree.XSLT(xslt)
html=transform(xml)

print(html)