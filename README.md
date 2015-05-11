# How to Integrate AngularJS into Rails

1. Set up your Rails app and database as usual.
2. Install bower:

  ```bash
  brew install node
  npm install -g bower
  ```

  ```ruby
  # Gemfile
  gem 'bower-rails'
  ```

3. Add `.bowerrc` to the root of your project with the following configuration:

  ```javascript
  {
    "directory": "vendor/assets/bower_components"
  }
  ```
  This will configure bower to install your dependencies to the above directory.

4. Add `bower.json` to the root of your project and add your dependencies. The following is an example:

  ```json
  {
    "name": "demo",
    "version": "0.0.1",
    "dependencies": {
      "angular": "1.2.16",
      "angular-animate": "v1.2.16",
      "angular-bootstrap": "~0.11.0",
      "angular-cookies": "1.2.16",
      "angular-sanitize": "1.2.16",
      "angular-resource": "1.2.16",
      "angular-route": "1.2.16",
      "bootstrap-sass-official": "~3.1.1",
      "es5-shim": "~2.1.0",
      "jquery": "~2.1.0",
      "json3": "~3.2.6",
      "restangular": "~1.3.1",
      "underscore": "~1.6.0"
    },
    "devDependencies": {
      "angular-mocks": "1.2.15",
      "angular-scenario": "1.2.15"
    },
    "resolutions": {
      "angular": "1.2.16"
    }
  }
  ```

  Run `rake bower:install` or `bower install` to install the dependencies.

5. In `app/assets/javascripts/application.js`, remove turbolinks and add all your dependencies. Create a directory `app/assets/views` or `app/assets/templates` for all your AngularJS templates.

6. In `config/routes.rb`, add the following:

  ```ruby
  root 'application#index'

  # Insert API routes here

  get '*path' => 'application#index'
  ```

  and the following in `app/controllers/application_controller.rb`:

  ```ruby
  class ApplicationController < ActionController::Base
    def index
    end
  end
  ```

  and finally in `app/views/application/index.html.erb`:

  ```html
  <div ng-view></div>
  ```

7. Now configure the asset pipeline in `config/application.rb`:
  ```ruby
  config.assets.enabled = true
  config.assets.paths << Rails.root.join('vendor', 'assets', 'bower_components')

  config.assets.precompile.push(Proc.new do |path|
    File.extname(path).in? [
      '.html', '.erb', '.hbs',                  # Templates
      '.png', '.gif', '.jpg', '.jpeg', '.svg',  # Images
      '.eot', '.otf', '.svc', '.woff', '.ttf',  # Fonts
    ]
  end)
  ```

8. Checkout other files in the project for more set up. Feel free to open up issues if you have any other questions regarding configuration.

The above was conceived from individual experimentation as well as some set up from [J Cole Morrison's blog post](http://start.jcolemorrison.com/setting-up-an-angularjs-and-rails-4-1-project/).
