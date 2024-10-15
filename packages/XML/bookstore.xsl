<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/bookstore">
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Book Store</title>
        </head>
        <body>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Year</th>
                    <th>Price</th>
                </tr>
                <xsl:for-each select="book">
                    <tr>
                        <td><xsl:value-of select="title"></xsl:value-of></td>
                        <td><xsl:value-of select="author"></xsl:value-of></td>
                        <td><xsl:value-of select="year"></xsl:value-of></td>
                        <td><xsl:value-of select="price"></xsl:value-of></td>
                    </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>