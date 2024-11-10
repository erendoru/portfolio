const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
  throw new Error('Missing Notion credentials');
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPublishedBlogPosts() {
  try {
    const posts = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'PublishedAt',
          direction: 'descending',
        },
      ],
    });

    return posts.results;
  } catch (error) {
    console.error('Notion API Error:', error);
    return [];
  }
}

export async function getSingleBlogPost(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug
        }
      }
    });

    const page = response.results[0];
    
    if (!page) {
      throw new Error(`Post not found for slug: ${slug}`);
    }

    console.log("Raw Image Data:", page.properties.Image);

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);

    let imageUrl = '';
    const imageProperty = page.properties.Image;
    
    if (imageProperty?.type === 'files' && imageProperty.files.length > 0) {
      const firstFile = imageProperty.files[0];
      if (firstFile.type === 'external') {
        imageUrl = firstFile.external.url;
      } else if (firstFile.type === 'file') {
        imageUrl = firstFile.file.url;
      }
    }

    console.log("Processed Image URL:", imageUrl);

    return {
      metadata: {
        Title: {
          title: [
            {
              plain_text: page.properties.Title?.title[0]?.plain_text || "Başlıksız Yazı"
            }
          ]
        },
        PublishedAt: {
          date: {
            start: page.properties.PublishedAt?.date?.start || new Date().toISOString()
          }
        },
        Tags: {
          multi_select: page.properties.Tags?.multi_select || []
        },
        Image: imageUrl ? { url: imageUrl } : null
      },
      markdown: mdString
    };

  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }
}