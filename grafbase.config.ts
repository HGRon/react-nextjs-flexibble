import { connector, graph, scalar  } from '@grafbase/sdk'

const gph = graph.Standalone()

const pg = connector.Postgres('Postgres', {
  url: gph.env('DATABASE_URL'),
});

const project = gph.type('Project', {
  title: gph.string().optional(),
  description: scalar.string(),
  image: scalar.url(),
  liveSiteUrl: scalar.url(),
  githubUrl: scalar.url(),
  category: scalar.string(),
});

const user = gph.type('User', {
  name: scalar.string().optional(),
  email: scalar.email(),
  avatarUrl: scalar.url(),
  description: scalar.string().optional(),
  githubUrl: scalar.url().optional(),
  linkedinUrl: scalar.url().optional(),
  projects: gph.ref(project).list().optional(),
});

gph.datasource(pg);
