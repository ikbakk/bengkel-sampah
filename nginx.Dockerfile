# Use the official Nginx image
FROM nginx

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Expose the port that Nginx will listen on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
