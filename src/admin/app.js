import { Mail, User } from '@strapi/icons';

const config = {
  locales: [],
};

const bootstrap = (app) => {
  app.addMenuLink({
    to: '/content-manager/collection-types/api::project-request.project-request',
    icon: Mail,
    intlLabel: {
      id: 'project-request.menu.label',
      defaultMessage: 'Project Requests',
    },
    permissions: [
      {
        action: 'plugin::content-manager.explorer.read',
        subject: 'api::project-request.project-request',
      },
    ],
  });

  app.addMenuLink({
    to: '/content-manager/collection-types/api::candidate-application.candidate-application',
    icon: User,
    intlLabel: {
      id: 'candidate-application.menu.label',
      defaultMessage: 'Candidate Applications',
    },
    permissions: [
      {
        action: 'plugin::content-manager.explorer.read',
        subject: 'api::candidate-application.candidate-application',
      },
    ],
  });
};

export default {
  config,
  bootstrap,
};
