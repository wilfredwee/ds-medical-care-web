package "apache2"
package "postgresql"
package "python-pip"
package "libpq-dev"
package "python-dev"
package "node"
package "npm"
package "libapache2-mod-wsgi"

cookbook_file "requirements.txt" do
    path "/tmp/requirements.txt"
end

execute 'setup_django' do
  command 'pip install -r /tmp/requirements.txt'
end

execute 'setup_db' do
  command 'echo "CREATE DATABASE dbdjango; CREATE USER dbuser  WITH PASSWORD \'password\'; GRANT ALL PRIVILEGES ON DATABASE dbdjango TO dbuser;" | sudo -u postgres psql'
end

service 'postgresql' do
  action :restart
end

execute 'migratedb' do
  command 'python /vagrant/manage.py migrate'
end

execute 'createuser' do
  command 'echo "from django.contrib.auth.models import User; User.objects.create_superuser(\'admin\', \'admin@example.com\', \'pass\')" | /vagrant/manage.py shell'
end

cookbook_file "000-default.conf" do
  path "/etc/apache2/sites-available/000-default.conf"
end

service 'apache2' do
  action :restart
end

